import express from "express";
import {createCheckoutSisson, createOrder, getAllOrders, getUserOrder} from "./order.controller.js";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";

const orderRouter = express.Router({ mergeParams: true });

orderRouter.post('/',protectedRouts,allowedTo('admin' ,'user'), createOrder);

orderRouter.post('/checkoutSisson/:id',protectedRouts,allowedTo('admin' ,'user'), createCheckoutSisson);

orderRouter.get('/',protectedRouts,allowedTo('admin' ,'user'), getUserOrder);

orderRouter.get('/getAllOrders',protectedRouts,allowedTo('admin' ,'user'), getAllOrders);



export default orderRouter;