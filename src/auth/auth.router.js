import express from "express";
import { validation } from "../middleware/validation.js";
import { uploadSingleFile } from "../middleware/fileUpload.js";
import {  forgetPassword, handleGoogleLogin, protectedRouts, resendVerifyOtp, resetPassword, signIn, signUp, verifyOtp } from "./auth.controller.js";
import { signInSchema, signUpSchema } from "./validation.auth.js";
import passport from "passport";
import { forgotPasswordLimiter, loginLimiter } from "../middleware/rateLimit.js";



const authRouter = express.Router();


authRouter.post('/sginUp', uploadSingleFile('user', 'profilImg'), validation(signUpSchema), signUp);

authRouter.post('/verifyOtp', verifyOtp);

authRouter.post('/resendVerifyOtp', resendVerifyOtp);

authRouter.post('/signIn', validation(signInSchema), signIn);

authRouter.post('/forgetPassword', forgotPasswordLimiter, protectedRouts, forgetPassword);

authRouter.post('/resetPassword/:userId', protectedRouts, resetPassword);

authRouter.get('/google/your-success-page/:token' ,(req ,res)=>{res.json({message:'success login'})});

authRouter.get('/google/login?error=authenticationFailed' ,(req ,res)=>{res.json({message:'failed to login'})});

/****************************************sign with google**************************************** */


authRouter.get("/google", loginLimiter, passport.authenticate('google', {
	scope:
		['email', 'profile']
}));

authRouter.get("/google/callback", passport.authenticate("google",{ session: false }),handleGoogleLogin);


/******************************************************************************** */

export default authRouter;

