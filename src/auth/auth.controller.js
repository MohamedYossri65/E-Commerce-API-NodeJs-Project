import Jwt from "jsonwebtoken";
import { userModel } from "../../database/models/user.model.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { AppError } from "../utils/AppError.js";
import nodemailer from "nodemailer"
import { htmlUserEmailTemplet } from "./user.email.js";
import cryptography from "cryptography";




// Function to send email with OTP
const sendEmail = async (email, name, resetTokenURL) => {
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

    // Send email with OTP
    const info = await transporter.sendMail({
        from: process.env.USER_EMAIL, // Sender address
        to: email, // Recipient
        subject: "Hello ✔", // Subject line
        html: htmlUserEmailTemplet(resetTokenURL) // HTML template for email body
    });

    // If email sent successfully, save OTP information in the database for verification
    return info.messageId; // Return message ID
}

// Route handler for user sign-up
const signUp = catchAsyncError(async (req, res, next) => {
    // Check if user with provided email already exists

    let user = await userModel.findOne({ email: req.body.email })

    if (user) return next(new AppError('Email already exists', 409))

    // If profile image is uploaded, set its filename in the request body
    if (req.file.filename) req.body.profilImg = req.file.filename;
    //check if password and confirm password are the same or not 
    if (req.body.confirmPassword != req.body.password) return next(new AppError('password confirm not match', 406))
    // Create new user record
    let result = new userModel(req.body);

    const resetToken = result.createVerficationToken();

    await result.save();
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/verifyEmail/${resetToken}`;

    // Send email with OTP
    let emailResponse = await sendEmail(req.body.email, req.body.name, resetURL);

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
const verifyEmail = catchAsyncError(async (req, res, next) => {
    const hashedToken = cryptography.encryptSync(req.params.token);
    const user = await userModel.findOne({
        passwordVerificationToken: hashedToken
        , passwordVerificationTokenExpiersAt: {
            $gt: Date.now()
        }
    });
    // If user not found or expired, send error response
    if (!user) return next(new AppError('Invalid token or expired token', 401));

    // Update user's status to verified
    user.isVerified = true;
    user.passwordVerificationToken = undefined;
    user.passwordVerificationTokenExpiersAt = undefined;
    await user.save();
    // Send success response
    res.status(200).json({
        status: 'Success',
        message: 'Thank you. Your email has been verified successfully.'
    })
})


/************************************************************************************ */
const signIn = catchAsyncError(async (req, res, next) => {
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
    let token = Jwt.sign({
        name: isFound.name,
        userId: isFound._id,
        role: isFound.role
    },
        process.env.JWT_SECRET_KEY);

    // Send success response with token
    // Send success response
    res.status(200).json({
        status: 'success',
        message: 'signed in successfully',
        token
    })
})



// Function to initiate the forgot password process
const forgetPassword = catchAsyncError(async (req, res, next) => {
    // Extract email from request body
    const { email } = req.body;

    // Find user by email
    let isFound = await userModel.findOne({ email })

    // If user is not found, send error response
    if (!isFound) {
        return next(new AppError("Email is incorrect", 404));
    }
    const resetToken = isFound.createVerficationToken();

    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${resetToken}`;
    await isFound.save();
    // Send email with OTP
    let emailResponse = await sendEmail(isFound.email, isFound.name, resetURL);

    // If email sending fails, delete the user record and send error response
    if (!emailResponse) {
        return next(new AppError('Please try again', 404))
    }
    // Send success response
    res.status(200).json({
        status: 'success',
        message: 'email sent successfully',
        data: isFound
    });
})

// Function to reset the user's password
const resetPassword = catchAsyncError(async (req, res, next) => {
    // Extract new password and OTP code from request body
    const { newPassword } = req.body;
    const hashedToken = cryptography.encryptSync(req.params.token);
    const user = await userModel.findOne({
        passwordVerificationToken: hashedToken
        , passwordVerificationTokenExpiersAt: {
            $gt: Date.now()
        }
    });
    // If user not found or expired, send error response
    if (!user) return next(new AppError('Invalid token or expired token', 401));

    user.passwordVerificationToken = undefined;
    user.passwordVerificationTokenExpiersAt = undefined;
    user.password = newPassword;
    user.PasswordChangeDate = new Date();
    await user.save();

    // Send success response
    res.status(200).json({
        status: 'success',
        message: "password updated successfully"
    });

})


const protectedRouts = catchAsyncError(async (req, res, next) => {
    // 1- check if token found in header or not 
    let token = undefined;
    if (!req.headers.authorization && !req.headers.authorization?.startsWith('Bearer ')) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
    token = req.headers.authorization.split(' ')[1];
    //3- decode token
    const decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY);
    //4- check if user exist or not
    const currentUser = await userModel.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }
    //5- check if token is valid token or expired

    if (currentUser.changePasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password! Please log in again.', 401));
    }
    //6- grant access to protected route
    req.user = currentUser;
    next();
});

const allowedTo = (...roles) => {
    return catchAsyncError(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('you are not allowed to access this route', 403));
        }
        next();
    })
}



/****************************************sign with google**************************************** */


const handleGoogleLogin = catchAsyncError(async (req, res, next) => {
    // Assuming your strategy attaches the JWT to the user object
    if (req.user && req.user.token) {
        // Redirect the user or send the token directly
        // Example: Redirect with the token in query params
        res.redirect(`your-success-page/token=${req.user.token}`);
        res.status(200).json({
            status: 'success',
            message: 'signed in successfully',
            token
        })

    } else {
        res.redirect('login?error=authenticationFailed');
    }
})

export {
    handleGoogleLogin,
    protectedRouts,
    resetPassword,
    forgetPassword,
    signIn,
    verifyEmail,
    signUp,
    allowedTo
}