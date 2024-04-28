import slugify from 'slugify'
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { AppError } from "../utils/AppError.js";
import { subCategoryModel } from './../../database/models/subCategory.model.js';


export const createsubCategory = catchAsyncError(async(req, res, next)=>{
    const {name ,category} = req.body;
    let result = new subCategoryModel({name ,slug :slugify(name) ,category});
    await result.save();

    res.json({message:'success' ,result });
})

export const getAllsubCategory = catchAsyncError(async(req, res, next)=>{
    
    let filter = {};
    if(req.params.categoryId){
        filter = {category: req.params.categoryId};
    }
    let result = await subCategoryModel.find(filter);
    res.json({message :'success' ,result});
})
export const getsubCategory = catchAsyncError(async(req, res, next)=>{
    let {id} = req.params;
    let result = await subCategoryModel.findById(id);
    !result && next(new AppError('subCategory not found' ,404));
    result && res.json({message :'success' ,result});
})
export const updatesubCategory = catchAsyncError(async(req, res, next)=>{
    let {id} = req.params;
    let {name ,category} = req.body;
    let result = await subCategoryModel.findByIdAndUpdate(id ,{name ,slug :slugify(name) ,category} , {new: true} );
    !result && next(new AppError('subCategory not found' ,404));
    result && res.json({message :'success' ,result});
})
export const deletesubCategory = catchAsyncError(async(req, res, next)=>{
    let {id} = req.params;
    let result = await subCategoryModel.findByIdAndDelete(id);
    
    if(!result) return next(new AppError('subCategory not found' ,404));
    res.json({message :'success' ,result});
})