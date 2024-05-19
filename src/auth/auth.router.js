import express from "express";
import { validation } from "../middleware/validation.js";
import { uploadSingleFile } from "../middleware/fileUpload.js";
import {  faildLogin, forgetPassword, protectedRouts, resendVerifyOtp, resetPassword, signIn, signUp, successLogin, verifyOtp } from "./auth.controller.js";
import { signInSchema, signUpSchema } from "./validation.auth.js";
import passport from "passport";



const authRouter = express.Router();


authRouter.post('/sginUp', uploadSingleFile('user', 'profilImg'), validation(signUpSchema), signUp);

authRouter.post('/verifyOtp', verifyOtp);

authRouter.post('/resendVerifyOtp', resendVerifyOtp);

authRouter.post('/signIn', validation(signInSchema), signIn);

authRouter.post('/forgetPassword', protectedRouts, forgetPassword);

authRouter.post('/resetPassword/:userId', protectedRouts, resetPassword);

/****************************************sign with google**************************************** */

authRouter.get("/login/success", LoginStatus);


authRouter.get("/google", passport.authenticate('google', { scope: 
	[ 'email', 'profile' ] 
}));

authRouter.get("/google/callback",passport.authenticate("google"),LoginStatus)	;

/******************************************************************************** */

export default authRouter;

