
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { AppError } from "../utils/AppError.js";
import { couponModel } from '../../database/models/coupon.model.js ';
import { ApiFeaturs } from "../utils/apiFeaturs.js";
import QRCode from "qrcode"



// Controller to create a new coupon
export const createCoupon = catchAsyncError(async (req, res, next) => {
    // Create a new coupon instance with the request body data
    let result = new couponModel(req.body);

    // Save the coupon to the database
    await result.save();

    // Respond with success message and the created coupon
    res.status(200).json({
        status: 'success',
        message: 'coupon created successfully',
        data: result
    });
});

// Controller to get all coupons
export const getAllCoupons = catchAsyncError(async (req, res, next) => {
    // Initialize API features with the coupon model query and request query parameters
    let apiFeaturs = new ApiFeaturs(couponModel.find({}), req.query)
        .paginate().filter().sort().search().select();

    // Execute the query with the API features
    let result = await apiFeaturs.mongooseQuery;

    // Respond with success message, current page, and the result
    res.status(200).json({
        status: 'success',
        page: ApiFeaturs.page,
        result: result.length,
        message: 'coupons founded successfully',
        data: result
    });
});

// Controller to get a single coupon by ID
export const getCoupon = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;

    // Find the coupon by ID
    let result = await couponModel.findById(id);

    // If the coupon is not found, pass an error to the next middleware
    if (!result) return next(new AppError('Coupon not found', 404));

    // Generate a QR code for the coupon code
    let url = await QRCode.toDataURL(result.code);

    // Respond with success message, the coupon, and the QR code URL
    res.status(200).json({
        status: 'success',
        message: 'coupon founded successfully',
        data: result,
        url
    });
});

// Controller to update a coupon by ID
export const updateCoupon = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;

    // Find the coupon by ID and update it with the request body data
    let result = await couponModel.findByIdAndUpdate(id, req.body, { new: true });

    // If the coupon is not found, pass an error to the next middleware
    if (!result) return next(new AppError('Coupon not found', 404));

    // Respond with success message and the updated coupon
    res.status(200).json({
        status: 'success',
        message: 'coupon updated successfully',
        data: result
    });
});

// Controller to delete a coupon by ID
export const deleteCoupon = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;

    // Find the coupon by ID and delete it
    let result = await couponModel.findByIdAndDelete(id);

    // If the coupon is not found, pass an error to the next middleware
    if (!result) return next(new AppError('Coupon not found', 404));

    // Respond with success message and the deleted coupon
    res.status(200).json({
        status: 'success',
        message: 'coupon deleted successfully',
        data: result
    });
});