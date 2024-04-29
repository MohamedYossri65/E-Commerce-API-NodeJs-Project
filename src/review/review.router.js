import express from "express";
import { createReview, deleteReview, getAllReviews, getReview, updateReview } from "./review.controller.js";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";
import { validation } from './../middleware/validation.js';
import { UpdateReviewSchema, createReviewSchema, getUpdateDeleteReviewSchema } from "./validation.review.js";


const reviewRouter = express.Router();

reviewRouter.post('/', protectedRouts, allowedTo('user'), validation(createReviewSchema), createReview);
reviewRouter.get('/', getAllReviews);
reviewRouter.get('/:id', validation(getUpdateDeleteReviewSchema), getReview);
reviewRouter.put('/:id', protectedRouts, allowedTo('user'), validation(UpdateReviewSchema), updateReview);
reviewRouter.delete('/:id', protectedRouts, allowedTo('admin', 'user'), validation(getUpdateDeleteReviewSchema), deleteReview);

export default reviewRouter;