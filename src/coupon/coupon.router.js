import express from "express";
import { createCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from "./coupon.controller.js";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";
import { validation } from './../middleware/validation.js';
import { UpdateCouponSchema, createCouponSchema, getUpdateDeleteCouponSchema } from "./validation.coupon.js";

const couponRouter = express.Router({ mergeParams: true });

couponRouter.post('/', protectedRouts, allowedTo('admin'), validation(createCouponSchema), createCoupon);
couponRouter.get('/', protectedRouts, allowedTo('admin'), getAllCoupons);
couponRouter.get('/:id', protectedRouts, allowedTo('admin'), validation(getUpdateDeleteCouponSchema), getCoupon);
couponRouter.put('/:id', protectedRouts, allowedTo('admin'), validation(UpdateCouponSchema), updateCoupon);
couponRouter.delete('/:id', protectedRouts, allowedTo('admin'), validation(getUpdateDeleteCouponSchema), deleteCoupon);

export default couponRouter;