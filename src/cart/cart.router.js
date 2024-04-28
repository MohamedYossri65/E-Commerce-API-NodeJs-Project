import express from "express";
import { addProductToCart, applyCoupon, deleteProductFromCart, getLoggedUserCart, updateQuantity} from "./cart.controller.js";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";

const cartRouter = express.Router({ mergeParams: true });

cartRouter.get('/',protectedRouts,allowedTo('admin' ,'user'), getLoggedUserCart);

cartRouter.post('/',protectedRouts,allowedTo('admin' ,'user'), addProductToCart);

cartRouter.put('/',protectedRouts,allowedTo('admin' ,'user'), updateQuantity);

cartRouter.put('/applyCoupon',protectedRouts,allowedTo('admin' ,'user'), applyCoupon);

cartRouter.delete('/:id',protectedRouts,allowedTo('admin' ,'user'), deleteProductFromCart);


export default cartRouter;