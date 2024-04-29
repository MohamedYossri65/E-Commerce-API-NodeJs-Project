import Jwt from "jsonwebtoken";
import { userModel } from "../../database/models/user.model.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from 'bcrypt';


export const signUp = catchAsyncError(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user) return next(new AppError('email already exist', 409))
    if (req.body.profilImg) req.body.profilImg = req.file.filename;
    let result = new userModel(req.body);
    await result.save();

    res.json({ message: 'success', result });
})
export const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    let isFound = await userModel.findOne({ email })
    const match = bcrypt.compareSync(password, isFound.password);
    if (isFound && match) {
        console.log(isFound);
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

export const allowedTo = (...roles)=>{

    return catchAsyncError(async (req, res, next) =>{
        if(!roles.includes(req.user.role))
            return next(new AppError('you are not authorized to access this route', 401));
        next()
    })
}
