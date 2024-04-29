import express from "express";

import { allowedTo, protectedRouts } from "../auth/auth.controller.js";
import { addToAddresses, deleteFromAddresses, getAllUserAddresses } from "./addresse.controller.js";
import { addToAddressesSchema, deleteFromAddressesSchema } from './validation.address.js';
import { validation } from './../middleware/validation.js';

const addressRouter = express.Router();

addressRouter.patch('/', protectedRouts, allowedTo('user'), validation(addToAddressesSchema),addToAddresses);

addressRouter.get('/',protectedRouts , allowedTo('user','admin'), getAllUserAddresses);

addressRouter.delete('/', protectedRouts, allowedTo('user'),validation(deleteFromAddressesSchema), deleteFromAddresses);

export default addressRouter;