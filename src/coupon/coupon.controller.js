
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { AppError } from "../utils/AppError.js";
import { couponModel } from '../../database/models/coupon.model.js ';
import { ApiFeaturs } from "../utils/apiFeaturs.js";
import QRCode from "qrcode"


export const createCoupon = catchAsyncError(async (req, res, next) => {
    let result = new couponModel(req.body);
    await result.save();
    res.json({ message: 'success', result });
})

export const getAllCoupons = catchAsyncError(async (req, res, next) => {

    let apiFeaturs = new ApiFeaturs(couponModel.find({}), req.query)
        .paginate().filter().sort().search().select();

    let result = await apiFeaturs.mongooseQuery;
    res.json({ message: 'success', page: ApiFeaturs.page, result });
})
export const getCoupon = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let result = await couponModel.findById(id);
    !result && next(new AppError('Coupon not found', 404));
    let url =await QRCode.toDataURL(result.code);
    result && res.json({ message: 'success', result ,url});
})
export const updateCoupon = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let result = await couponModel.findByIdAndUpdate(id, req.body, { new: true });
    !result && next(new AppError('Coupon not found', 404));
    result && res.json({ message: 'success', result });
})
export const deleteCoupon = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let result = await couponModel.findByIdAndDelete(id);

    if (!result) return next(new AppError('Coupon not found', 404));
    res.json({ message: 'success', result });
})