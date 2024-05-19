import slugify from 'slugify'
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { AppError } from "../utils/AppError.js";

import { productModel } from './../../database/models/proudcts.model.js';
import { ApiFeaturs } from '../utils/apiFeaturs.js';


// Controller to create a new product
export const creatProduct = catchAsyncError(async (req, res, next) => {
    // Generate slug from the product title
    req.body.slug = slugify(req.body.title);

    // Extract and save image filenames from request files
    req.body.imgCover = req.files.imgCover[0].filename;
    req.body.imgs = req.files.imgs.map((obj) => obj.filename);

    // Create a new product document and save it to the database
    let result = new productModel(req.body);
    await result.save();

    // Respond with success message and the created product
    res.json({ message: 'success', result });
});

// Controller to get all products with various features (pagination, filtering, sorting, etc.)
export const getAllProduct = catchAsyncError(async (req, res, next) => {
    // Initialize API features with the product model and query parameters
    let apiFeaturs = new ApiFeaturs(productModel.find({}), req.query)
        .paginate().filter().sort().search().select();

    // Execute the query
    let result = await apiFeaturs.mongooseQuery;

    // Respond with success message, current page, and the result
    res.status(200).json({ message: 'success', page: apiFeaturs.page, result });
});

// Controller to get a single product by ID
export const getProduct = catchAsyncError(async (req, res, next) => {
    let { id } = req.params; // Extract product ID from request parameters
    let result = await productModel.findById(id); // Find product by ID

    // If product not found, pass an error to the next middleware
    if (!result) return next(new AppError('product not found', 404));

    // If product found, respond with success message and the product
    res.status(200).json({ message: 'success', result });
});

// Controller to update a product by ID
export const updateProduct = catchAsyncError(async (req, res, next) => {
    let { id } = req.params; // Extract product ID from request parameters

    // Extract and save image filenames from request files
    req.body.imgCover = req.files.imgCover[0].filename;
    req.body.imgs = req.files.imgs.map((obj) => obj.filename);

    // If title is provided, generate slug from the new title
    if (req.body.title) req.body.slug = slugify(req.body.title);

    // Find product by ID and update it with the new data
    let result = await productModel.findByIdAndUpdate(id, req.body, { new: true });

    // If product not found, pass an error to the next middleware
    if (!result) return next(new AppError('product not found', 404));

    // If product found and updated, respond with success message and the updated product
    res.status(200).json({ message: 'success', result });
});

// Controller to delete a product by ID
export const deleteProduct = catchAsyncError(async (req, res, next) => {
    let { id } = req.params; // Extract product ID from request parameters
    let result = await productModel.findByIdAndDelete(id); // Find product by ID and delete it

    // If product not found, pass an error to the next middleware
    if (!result) return next(new AppError('product not found', 404));

    // If product found and deleted, respond with success message and the deleted product
    res.status(200).json({ message: 'success', result });
});