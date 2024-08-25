
import { userModel } from '../../database/models/user.model.js';
import { catchAsyncError } from '../middleware/catchAsyncError.js';
import { AppError } from '../utils/AppError.js';



export const getAllUserAddresses = catchAsyncError(async (req, res, next) => {
    let result = await userModel.findOne({ _id: req.user._id }).populate('addresses');
    !result && next(new AppError(`address not found or you are not authorized to do this action`, 404));
    result && res.status(200).json({
        status: 'success',
        message: 'all addresses founded successfully',
        data: result.addresses
    });
})
export const addToAddresses = catchAsyncError(async (req, res, next) => {
    let result = await userModel.findByIdAndUpdate(req.user._id, { $push: { addresses: req.body } }, { new: true });
    !result && next(new AppError(`address not found or you are not authorized to do this action`, 404));
    result && res.status(200).json({
        status: 'success',
        message: 'addresses were added successfully',
        data: result.addresses
    });
})

export const deleteFromAddresses = catchAsyncError(async (req, res, next) => {
    let { addressId } = req.body;
    let result = await userModel.findByIdAndUpdate(req.user._id, { $pull: { addresses: { _id: addressId } } }, { new: true });

    if (!result) return next(new AppError(`address not found in addresses`, 404));
    res.status(200).json({
        status: 'success',
        message: 'addresses were deleted successfully',
        data: result.addresses
    });
});
