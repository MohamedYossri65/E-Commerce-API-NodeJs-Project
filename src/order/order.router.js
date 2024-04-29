import express from "express";
import { createCheckoutSisson, createOrder, getAllOrders, getUserOrder } from "./order.controller.js";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";
import { validation } from './../middleware/validation.js';
import { createCheckoutSissonSchema, createOrderSchema } from "./validation.order.js";

const orderRouter = express.Router({ mergeParams: true });

orderRouter.post('/', protectedRouts, allowedTo('admin', 'user'), validation(createOrderSchema), createOrder);

orderRouter.post('/checkoutSisson/:id', protectedRouts, allowedTo('admin', 'user'), validation(createCheckoutSissonSchema), createCheckoutSisson);

orderRouter.get('/', protectedRouts, allowedTo('admin', 'user'), getUserOrder);

orderRouter.get('/getAllOrders', protectedRouts, allowedTo('admin', 'user'), getAllOrders);



export default orderRouter;