
import * as factor from '../handlers/factor.handler.js';
import { catchAsyncError } from '../middleware/catchAsyncError.js';
import { AppError } from '../utils/AppError.js';
import { ApiFeaturs } from '../utils/apiFeaturs.js';
import { reviewModel } from './../../database/models/reviews.model.js';



export const createReview = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user._id;
    let isReview = await reviewModel.findOne({ user: req.user._id, product: req.body.product });
    if (isReview) return next(new AppError('you created a review to this product before', 409))
    let result = new reviewModel(req.body);

    await result.save();
    res.status(200).json({
        status: 'success',
        message: 'review created successfully',
        data: result
    });
})

export const getAllReviews = catchAsyncError(async (req, res, next) => {

    let apiFeaturs = new ApiFeaturs(reviewModel.find({}), req.query)
        .paginate().filter().sort().search().select();

    let result = await apiFeaturs.mongooseQuery;
    res.status(200).json({
        status: 'success',
        page: ApiFeaturs.page,
        result: result.length,
        message: 'reviews founded successfully',
        data: result
    });
})

export const getReview = factor.getOne(reviewModel, 'review');

export const updateReview = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let result = await reviewModel.findOneAndUpdate({
        _id: id,
        user: req.user._id
    }, req.body, { new: true });
    !result && next(new AppError(`review not found or you are not authorized to do this action`, 404));
    result && res.status(200).json({
        status: 'success',
        message: 'reviews updated successfully',
        data: result
    });
})

export const deleteReview = factor.deleteOne(reviewModel, 'review');