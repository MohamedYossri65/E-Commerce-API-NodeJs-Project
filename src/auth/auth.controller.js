import Jwt from "jsonwebtoken";
import { userModel } from "../../database/models/user.model.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from 'bcryptjs';
import nodemailer from "nodemailer"
import { OtpVerificationModel } from "../../database/models/otpUser.model.js";
import { htmlUserEmailTemplet } from "./user.email.js";




// Function to send email with OTP
const sendEmail = async (email, name, id) => {
    // Create transporter for sending emails
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        },
    });

    // Generate OTP
    const otp = Math.floor((Math.random() * 9000) + 1000);

    // Send email with OTP
    const info = await transporter.sendMail({
        from: process.env.USER_EMAIL, // Sender address
        to: email, // Recipient
        subject: "Hello ✔", // Subject line
        html: htmlUserEmailTemplet(otp, name) // HTML template for email body
    });

    // If email sent successfully, save OTP information in the database for verification
    if (info.messageId) {
        let otpSave = new OtpVerificationModel({
            userId: id,
            otpCode: otp,
            // Set expiration time for OTP (e.g., 1 hour from now)
            expiredAt: Date.now() + 3600000
        })
        await otpSave.save();
    }
    return info.messageId; // Return message ID
}

// Route handler for user sign-up
export const signUp = catchAsyncError(async (req, res, next) => {
    // Check if user with provided email already exists

    let user = await userModel.findOne({ email: req.body.email })

    if (user) return next(new AppError('Email already exists', 409))

    // If profile image is uploaded, set its filename in the request body
    if (req.file.filename) req.body.profilImg = req.file.filename;
    //check if password and confirm password are the same or not 
    if (req.body.confirmPassword != req.body.password) return next(new AppError('password confirm not match', 406))
    // Create new user record
    let result = new userModel(req.body);
    await result.save();

    // Send email with OTP
    let emailResponse = await sendEmail(req.body.email, req.body.name, result._id);

    // If email sending fails, delete the user record and send error response
    if (!emailResponse) {
        await userModel.deleteOne({ email: req.body.email });
        return next(new AppError('Please sign up again', 404))
    }

    // Send success response with the result
    res.status(200).json({
        status: 'success',
        message: 'signed up successfully',
        data: result
    });
})



// Route handler for verifying OTP
export const verifyOtp = catchAsyncError(async (req, res, next) => {
    // Find the OTP record associated with the user ID
    let userOtp = await OtpVerificationModel.findOne({ userId: req.body.userId })

    const date = new Date().getTime();
    const dateOtp = new Date(userOtp?.expiredAt).getTime();
    // Check if the OTP code is valid and not expired
    if (date < dateOtp || req.body.otpCode !== userOtp.otpCode.toString()) {
        // If OTP code is invalid or expired, send error response
        return next(new AppError('Code is not correct or has expired. Please sign up again.', 404))
    }

    // Delete all OTP records for this user (cleanup)
    await OtpVerificationModel.deleteMany({ userId: req.body.userId });

    // Find the user associated with the provided user ID
    let user = await userModel.findById(req.body.userId);

    // If user is already verified, send error response
    if (user.isVerified == true) return next(new AppError('Email has already been verified.', 409))

    // Update user's verification status to true
    await userModel.updateOne({ _id: req.body.userId }, { isVerified: true });

    // Send success response
    res.status(200).json({
        status: 'Success',
        message: 'Thank you. Your email has been verified successfully.'
    })
})

// Route handler for resending OTP
export const resendVerifyOtp = catchAsyncError(async (req, res, next) => {
    // Find user by user ID
    let user = await userModel.findById(req.body.userId);

    // If user is already verified, send error response
    if (user.isVerified == true) return next(new AppError('Email has already been verified.', 409));

    // Delete all OTP records for this user (cleanup)
    await OtpVerificationModel.deleteMany({ userId: req.body.userId });

    // Send email with OTP again
    let emailResponse = sendEmail(user.email, user.name, user._id);

    // If email sending fails, delete the user record and send error response
    if (!emailResponse) {
        await userModel.deleteOne({ email: user.email });
        return next(new AppError('Please sign up again', 404))
    }

    // Send success response
    res.status(200).json({
        status: 'Success',
        message: 'Code sent again. Please check your email.'
    })
})


/************************************************************************************ */
export const signIn = catchAsyncError(async (req, res, next) => {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find user by email
    let isFound = await userModel.findOne({ email })

    // If user is not found or password is incorrect, send error response
    if (!isFound || (!isFound.correctPassword(password, isFound?.password))) {
        return next(new AppError("Email or password is incorrect", 404));
    }

    // If user's email is not verified, send error response
    if (!isFound.isVerified) return next(new AppError('Please verify your email before signing in', 401));

    // Generate JWT token for authentication
    let token = Jwt.sign({ name: isFound.name, userId: isFound._id, role: isFound.role }, process.env.SECRET_CODE);

    // Send success response with token
    // Send success response
    res.status(200).json({
        status: 'success',
        message: 'signed in successfully',
        token
    })
})



// Function to initiate the forgot password process
export const forgetPassword = catchAsyncError(async (req, res, next) => {
    // Extract email from request body
    const { email } = req.body;

    // Find user by email
    let isFound = await userModel.findOne({ email })

    // If user is not found, send error response
    if (!isFound) {
        return next(new AppError("Email is incorrect", 404));
    }

    // Send email with OTP
    let emailResponse = await sendEmail(isFound.email, isFound.name, isFound._id);

    // If email sending fails, delete the user record and send error response
    if (!emailResponse) {
        return next(new AppError('Please try again', 404))
    }
    // Send success response
    res.status(200).json({
        status: 'success',
        message: 'Otp sent to email!',
        data: isFound
    });
})

// Function to reset the user's password
export const resetPassword = catchAsyncError(async (req, res, next) => {
    // Extract new password and OTP code from request body
    const { newPassword, otpCode } = req.body;

    // Find the OTP record associated with the user ID
    let userOtp = await OtpVerificationModel.findOne({ userId: req.params.userId })

    const date = new Date().getTime();
    const dateOtp = new Date(userOtp?.expiredAt).getTime();
    // Check if the OTP code is valid and not expired
    if (date < dateOtp || otpCode !== userOtp.otpCode.toString()) {
        // If OTP code is invalid or expired, send error response
        return next(new AppError('Code is not correct or has expired. Please sign up again.', 404))
    }

    // Delete all OTP records for this user (cleanup)
    await OtpVerificationModel.deleteMany({ userId: req.params.userId });

    // Find the user associated with the provided user ID
    let user = await userModel.findById(req.params.userId);

    // Update user's password
    await userModel.findOneAndUpdate({ _id: req.params.userId }, { password: newPassword, PasswordChangeDate: Date.now() });

    // Send success response
    res.status(200).json({
        status: 'success',
        message: "password updated successfully"
    });

})


export const protectedRouts = catchAsyncError(async (req, res, next) => {
    // Extract token from request headers
    let { token } = req.headers;

    // If token is not provided, send error response
    if (!token) return next(new AppError('Token not provided', 401));

    // Verify JWT token
    let decoded = await Jwt.verify(token, process.env.SECRET_CODE);

    // Find user by decoded user ID from token
    let user = await userModel.findById(decoded.userId);

    // If user is not found, send error response
    if (!user) return next(new AppError('Token is not valid', 401));

    // Check if user's password has been changed after the token was issued
    if (user?.PasswordChangeDate) {
        let changePasswordDate = parseInt(user.PasswordChangeDate.getTime() / 1000);
        if (changePasswordDate > decoded.iat) return next(new AppError('Token is not valid', 401));
    }

    // Set user information in request object for further processing
    req.user = user;
    next();
})

// Middleware to check if user is allowed to access specific routes based on roles
export const allowedTo = (...roles) => {
    return catchAsyncError(async (req, res, next) => {
        // Check if user's role is included in allowed roles
        if (!roles.includes(req.user.role))
            return next(new AppError('You are not authorized to access this route', 403));
        next()
    })
}



/****************************************sign with google**************************************** */


export const handleGoogleLogin = catchAsyncError(async (req, res, next) => {
    // Assuming your strategy attaches the JWT to the user object
    if (req.user && req.user.token) {
        // Redirect the user or send the token directly
        // Example: Redirect with the token in query params
        res.redirect(`your-success-page/token=${req.user.token}`);
    } else {
        res.redirect('login?error=authenticationFailed');
    }
})

