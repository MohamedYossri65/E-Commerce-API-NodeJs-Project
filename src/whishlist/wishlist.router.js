import express from "express";

import { allowedTo, protectedRouts } from "../auth/auth.controller.js";
import { addToWhishlist, deleteFromWhishlist, getAllUserWhishlist } from "./whishlist.controller.js";
import { validation } from "../middleware/validation.js";
import { addDeleteToWhishlistSchema } from "./validation.whishlist.js";


const whishlistRouter = express.Router();


whishlistRouter.patch('/', protectedRouts, allowedTo('user'), validation(addDeleteToWhishlistSchema), addToWhishlist);
whishlistRouter.get('/', protectedRouts, allowedTo('user'), getAllUserWhishlist);

whishlistRouter.delete('/', protectedRouts, allowedTo('user'), validation(addDeleteToWhishlistSchema), deleteFromWhishlist);

export default whishlistRouter;