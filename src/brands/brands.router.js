import  express from "express";
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "./brands.controller.js";
import { validation } from "../middleware/validation.js";
import { createBrandSchema, getBrandsSchema, updateBrandsSchema } from "./validation.brands.js";
import { uploadSingleFile } from "../middleware/fileUpload.js";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";


const brandRouter = express.Router();

// brandRouter.use('/:brandId/subCategories' ,brandRouter);

brandRouter.post('/' ,protectedRouts,allowedTo('admin'),uploadSingleFile('brand' ,'logo'), validation(createBrandSchema),createBrand);
brandRouter.get('/'  ,getAllBrands);
brandRouter.get('/:id' ,validation(getBrandsSchema) ,getBrand);
brandRouter.put('/:id' ,allowedTo('admin'),uploadSingleFile('brand' ,'logo') ,validation(updateBrandsSchema),updateBrand);
brandRouter.delete('/:id' ,allowedTo('admin'),validation(getBrandsSchema),deleteBrand);

export default brandRouter;