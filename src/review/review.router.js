import express from "express";
import { createReview, deleteReview, getAllReviews, getReview, updateReview } from "./review.controller.js";

import { allowedTo, protectedRouts } from "../auth/auth.controller.js";


const reviewRouter = express.Router();

// reviewRouter.use('/:reviewId/subCategories' ,reviewRouter);

reviewRouter.post('/', protectedRouts, allowedTo('user'), createReview);
reviewRouter.get('/', getAllReviews);
reviewRouter.get('/:id', getReview);
reviewRouter.put('/:id', protectedRouts, allowedTo('user'), updateReview);
reviewRouter.delete('/:id', protectedRouts, allowedTo('admin', 'user'), deleteReview);

export default reviewRouter;