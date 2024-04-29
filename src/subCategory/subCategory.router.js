import express from "express";
import { createsubCategory, deletesubCategory, getAllsubCategory, getsubCategory, updatesubCategory } from "./subCategory.controller.js";
import { validation } from "../middleware/validation.js";
import { createSubCategorySchema, getSubCategorySchema, updateSubCategorySchema } from "./validation.subCategory.js";
import { allowedTo, protectedRouts } from "../auth/auth.controller.js";


const subCategoryRouter = express.Router({ mergeParams: true });

subCategoryRouter.post('/', protectedRouts, allowedTo('admin'), validation(createSubCategorySchema), createsubCategory);
subCategoryRouter.get('/', getAllsubCategory);
subCategoryRouter.get('/:id', validation(getSubCategorySchema), getsubCategory);
subCategoryRouter.put('/:id', protectedRouts, allowedTo('admin'), validation(updateSubCategorySchema), updatesubCategory);
subCategoryRouter.delete('/:id', protectedRouts, allowedTo('admin'), validation(getSubCategorySchema), deletesubCategory);

export default subCategoryRouter;