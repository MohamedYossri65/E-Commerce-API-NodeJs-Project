import express from "express";

import { allowedTo, protectedRouts } from "../auth/auth.controller.js";
import { addToWhishlist, deleteFromWhishlist, getAllUserWhishlist } from "./whishlist.controller.js";


const whishlistRouter = express.Router();


whishlistRouter.patch('/', protectedRouts, allowedTo('user'), addToWhishlist);
whishlistRouter.get('/',protectedRouts , allowedTo('user'), getAllUserWhishlist);

whishlistRouter.delete('/', protectedRouts, allowedTo('user'), deleteFromWhishlist);

export default whishlistRouter;