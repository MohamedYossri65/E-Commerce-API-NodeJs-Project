import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "./category.controller.js";
import subCategoryRouter from "../subCategory/subCategory.router.js";
import { validation } from "../middleware/validation.js";
import { createCategorySchema, getCategorySchema, updateCategorySchema } from "./validation.category.js";
import { uploadSingleFile } from "../middleware/fileUpload.js";
import { allowedTo } from "../auth/auth.controller.js";


const categoryRouter = express.Router();

categoryRouter.use('/:categoryId/subCategories', subCategoryRouter);



categoryRouter.post('/' ,allowedTo('admin'),uploadSingleFile('category' ,'img') , validation(createCategorySchema), createCategory);
categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', validation(getCategorySchema), getCategory);
categoryRouter.put('/:id' , allowedTo('admin') ,uploadSingleFile('category' ,'img') , validation(updateCategorySchema), updateCategory);
categoryRouter.delete('/:id', allowedTo('admin'), validation(getCategorySchema), deleteCategory);

export default categoryRouter;