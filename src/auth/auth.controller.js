import Jwt from "jsonwebtoken";
import { userModel } from "../../database/models/user.model.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from 'bcrypt';
import nodemailer from "nodemailer"
import { OtpVerificationModel } from "../../database/models/otpUser.model.js";
import { htmlUserEmailTemplet } from "./user.email.js";



async function sendEmail(email, name) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        },
    });
    const otp = Math.floor((Math.random() * 9000) + 1000);
    const info = await transporter.sendMail({
        from: process.env.USER_EMAIL, // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: htmlUserEmailTemplet(otp, name)
    });
    let obj = {
        id: info.messageId,
        otp: otp
    }
    return obj
}

export const signUp = catchAsyncError(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user) return next(new AppError('email already exist', 409))
    if (req.body.profilImg) req.body.profilImg = req.file.filename;
    let result = new userModel(req.body);
    await result.save();

    res.json({ message: 'success', result });
})


export const verifyOtp = catchAsyncError(async (req, res, next) => {
    let userOtp = await OtpVerificationModel.findOne({ userId: req.body.userId })

    const match = bcrypt.compareSync(req.body.otpCode, userOtp.otpCode);

    if (!((Date.now()) < userOtp.expiredAt && match)) {
        return next(new AppError('code is not true or expiered signUp again', 404))
    }
    let user = await userModel.findById(req.body.userId);
    if (user.isVerified == true) return next(new AppError('email is verified before', 409))
    user.isVerified = true;
    await user.save()
    res.status(202).json({ message: 'success', result: "Thank you your Email is verified successfully" })
})



/************************************************************************************ */
export const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    let isFound = await userModel.findOne({ email })
    const match = bcrypt.compareSync(password, isFound.password);
    if (isFound && match) {

        if (isFound.isVerified == false) return next(new AppError('please verify your email first to sign in', 401));

        let token = Jwt.sign({ name: isFound.name, userId: isFound._id, role: isFound.role }, 'shhhhh');
        res.json({ message: 'success', token });
    }
    next(new AppError('email or password is not true', 401));
})

export const protectedRouts = catchAsyncError(async (req, res, next) => {
    let { token } = req.headers;
    if (!token) return next(new AppError('token not provided', 401));
    let decoded = await Jwt.verify(token, 'shhhhh');
    let user = await userModel.findById(decoded.userId);
    if (!user) return next(new AppError('token not valid', 401));
    if (user?.PasswordChangeDate) {
        let changePasswordDate = parseInt(user.PasswordChangeDate.getTime() / 1000);
        if (changePasswordDate > decoded.iat) return next(new AppError('token not valid', 401));
    }
    req.user = user;
    next();
})

export const allowedTo = (...roles) => {

    return catchAsyncError(async (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new AppError('you are not authorized to access this route', 401));
        next()
    })
}
