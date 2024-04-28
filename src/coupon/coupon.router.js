import express from "express";
import { createCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from "./coupon.controller.js";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";

const couponRouter = express.Router({ mergeParams: true });

couponRouter.post('/',protectedRouts,allowedTo('admin' ,'user'), createCoupon);
couponRouter.get('/',protectedRouts,allowedTo('admin' ,'user'), getAllCoupons);
couponRouter.get('/:id',protectedRouts,allowedTo('admin' ,'user'), getCoupon);
couponRouter.put('/:id',protectedRouts,allowedTo('admin' ,'user'), updateCoupon);
couponRouter.delete('/:id',protectedRouts,allowedTo('admin' ,'user'), deleteCoupon);

export default couponRouter;