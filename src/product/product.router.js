import express from "express";
import { creatProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from "./product.controller.js";
import { validation } from "../middleware/validation.js";
import { createProductSchema, getProductSchema, updateProductSchema } from "./validation.product.js";
import { uploadMixOfFiles } from './../middleware/fileUpload.js';
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";


const productRouter = express.Router({ mergeParams: true });

let fieldArray = [{name :'imgCover' ,maxCount: 1} ,{name :'imgs' ,maxCount: 10}]

productRouter.post('/', protectedRouts , allowedTo('admin'), uploadMixOfFiles('product' ,fieldArray) ,validation(createProductSchema), creatProduct);
productRouter.get('/', getAllProduct);
productRouter.get('/:id', getProduct);
productRouter.put('/:id', allowedTo('admin'),uploadMixOfFiles('product' ,fieldArray),  updateProduct);
productRouter.delete('/:id', allowedTo('admin'),deleteProduct);

export default productRouter;