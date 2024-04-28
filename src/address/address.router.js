import express from "express";

import { allowedTo, protectedRouts } from "../auth/auth.controller.js";
import { addToAddresses, deleteFromAddresses, getAllUserAddresses } from "./addresse.controller.js";


const addressRouter = express.Router();


addressRouter.patch('/', protectedRouts, allowedTo('user'), addToAddresses);
addressRouter.get('/',protectedRouts , allowedTo('user'), getAllUserAddresses);

addressRouter.delete('/', protectedRouts, allowedTo('user'), deleteFromAddresses);

export default addressRouter;