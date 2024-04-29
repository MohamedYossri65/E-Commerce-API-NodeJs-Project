import express from "express";
import { validation } from "../middleware/validation.js";
import { uploadSingleFile } from "../middleware/fileUpload.js";
import { signIn, signUp, verifyOtp } from "./auth.controller.js";
import { signInSchema, signUpSchema } from "./validation.auth.js";



const authRouter = express.Router();


authRouter.post('/sginUp', uploadSingleFile('user', 'profilImg'), validation(signUpSchema), signUp);

authRouter.post('/verifyOtp', verifyOtp);

authRouter.post('/signIn', uploadSingleFile('user', 'profilImg'), validation(signInSchema), signIn);

export default authRouter;