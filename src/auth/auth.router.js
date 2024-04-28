import  express from "express";
import { validation } from "../middleware/validation.js";
import { uploadSingleFile } from "../middleware/fileUpload.js";
import { signIn, signUp } from "./auth.controller.js";


const authRouter = express.Router();


authRouter.post('/sginUp' ,uploadSingleFile('user' ,'profilImg'),signUp);
authRouter.post('/signIn' ,uploadSingleFile('user' ,'profilImg'),signIn);

export default authRouter;