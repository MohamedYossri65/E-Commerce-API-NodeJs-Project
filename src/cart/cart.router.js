import express from "express";
import { addProductToCart, applyCoupon, deleteProductFromCart, getLoggedUserCart, updateQuantity } from "./cart.controller.js";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";
import { validation } from './../middleware/validation.js';
import { addProductToCartSchema ,updateQuantitySchema ,upplayCouponSchema ,deleteProductFromCartSchema} from "./validation.cart.js";

const cartRouter = express.Router();

cartRouter.get('/', protectedRouts, allowedTo('user'), getLoggedUserCart);

cartRouter.post('/', protectedRouts, allowedTo('user'), validation(addProductToCartSchema), addProductToCart);

cartRouter.put('/', protectedRouts, allowedTo('user'), validation(updateQuantitySchema), updateQuantity);

cartRouter.put('/applyCoupon', protectedRouts, allowedTo('user') ,validation(upplayCouponSchema), applyCoupon);

cartRouter.delete('/:id', protectedRouts, allowedTo('user') ,validation(deleteProductFromCartSchema), deleteProductFromCart);


export default cartRouter;