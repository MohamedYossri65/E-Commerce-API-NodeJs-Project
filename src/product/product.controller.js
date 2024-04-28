import slugify from 'slugify'
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { AppError } from "../utils/AppError.js";

import { productModel } from './../../database/models/proudcts.model.js';
import { ApiFeaturs } from '../utils/apiFeaturs.js';


export const creatProduct = catchAsyncError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title);
    req.body.imgCover = req.files.imgCover[0].filename;
    req.body.imgs = req.files.imgs.map((obj)=>obj.filename);
    let result = new productModel(req.body);
    await result.save();
    res.json({ message: 'success', result });
})

export const getAllProduct = catchAsyncError(async (req, res, next) => {

    let apiFeaturs = new ApiFeaturs(productModel.find({}) , req.query)
        .paginate().filter().sort().search().select();

    //excute query
    let result = await apiFeaturs.mongooseQuery;
    res.status(200).json({ message: 'success', page: apiFeaturs.page, result });
})
export const getProduct = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let result = await productModel.findById(id);
    !result && next(new AppError('product not found', 404));
    result && res.status(200).json({ message: 'success', result });
})
export const updateProduct = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    req.body.imgCover = req.files.imgCover[0].filename;
    req.body.imgs = req.files.imgs.map((obj)=>obj.filename);
    if (req.body.title) req.body.slug = slugify(req.body.title);

    let result = await productModel.findByIdAndUpdate(id, req.body, { new: true });
    !result && next(new AppError('product not found', 404));
    result && res.status(200).json({ message: 'success', result });
})
export const deleteProduct = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let result = await productModel.findByIdAndDelete(id);

    if (!result) return next(new AppError('product not found', 404));
    res.status(200).json({ message: 'success', result });
})