
import { userModel } from '../../database/models/user.model.js';
import { catchAsyncError } from '../middleware/catchAsyncError.js';
import { AppError } from '../utils/AppError.js';



export const getAllUserWhishlist = catchAsyncError(async (req, res, next) => {
    let result = await userModel.findOne({ _id: req.user._id }).populate('whishlist');
    !result && next(new AppError(`product not found or you are not authorized to do this action`, 404));
    result && res.status(200).json({
        status: 'success',
        message: 'user whishlist founded successfully',
        data: result.whishlist
    });
})
export const addToWhishlist = catchAsyncError(async (req, res, next) => {
    let { product } = req.body;
    let result = await userModel.findByIdAndUpdate(req.user._id, { $addToSet: { whishlist: product } }, { new: true });
    !result && next(new AppError(`product not found or you are not authorized to do this action`, 404));
    result && res.status(200).json({
        status: 'success',
        message: 'whishlist added successfully',
        data: result.whishlist
    });
})

export const deleteFromWhishlist = catchAsyncError(async (req, res, next) => {
    let { product } = req.body;
    let result = await userModel.findByIdAndUpdate(req.user._id, { $pull: { whishlist: product } }, { new: true });

    if (!result) return next(new AppError(`product not found in whishlist`, 404));
    res.status(200).json({
        status: 'success',
        message: 'whishlist deleted successfully',
        data: result.whishlist
    });
});