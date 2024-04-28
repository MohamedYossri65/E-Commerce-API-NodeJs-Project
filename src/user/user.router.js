import  express from "express";
import { ChangeUserPassword, createUser, deleteUser, getAllUser, getUser, updateUser } from "./user.controller.js";
import { validation } from "../middleware/validation.js";
import { createUserSchema, getUsersSchema, updateUsersSchema } from "./validation.user.js";
import { uploadSingleFile } from "../middleware/fileUpload.js";


const userRouter = express.Router();

// userRouter.use('/:brandId/subCategories' ,userRouter);

userRouter.post('/' ,uploadSingleFile('user' ,'profilImg'), validation(createUserSchema),createUser);
userRouter.get('/' ,getAllUser);
userRouter.get('/:id' ,validation(getUsersSchema) ,getUser);
userRouter.put('/:id' ,uploadSingleFile('user' ,'profilImg') ,validation(updateUsersSchema),updateUser);
userRouter.delete('/:id' ,validation(getUsersSchema),deleteUser);
userRouter.patch('/:id' ,validation(getUsersSchema),ChangeUserPassword); 

export default userRouter;