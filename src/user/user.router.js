import express from "express";
import { ChangeUserPassword, createUser, deleteUser, getAllUser, getUser, updateUser } from "./user.controller.js";
import { validation } from "../middleware/validation.js";
import { createUserSchema, getUsersSchema, updateUsersSchema } from "./validation.user.js";
import { uploadSingleFile } from "../middleware/fileUpload.js";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";


const userRouter = express.Router();

// userRouter.use('/:brandId/subCategories' ,userRouter);

userRouter.post('/', protectedRouts, allowedTo('admin'), uploadSingleFile('user', 'profilImg'), validation(createUserSchema), createUser);
userRouter.get('/', protectedRouts, allowedTo('admin'), getAllUser);
userRouter.get('/:id', protectedRouts, allowedTo('admin'), validation(getUsersSchema), getUser);
userRouter.put('/:id', protectedRouts, allowedTo('admin'), uploadSingleFile('user', 'profilImg'), validation(updateUsersSchema), updateUser);
userRouter.delete('/:id', protectedRouts, allowedTo('admin'), validation(getUsersSchema), deleteUser);
userRouter.patch('/:id', protectedRouts, allowedTo('admin'), validation(getUsersSchema), ChangeUserPassword);

export default userRouter;