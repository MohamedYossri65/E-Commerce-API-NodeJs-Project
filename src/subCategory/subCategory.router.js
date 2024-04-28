import express from "express";
import { createsubCategory, deletesubCategory, getAllsubCategory, getsubCategory, updatesubCategory } from "./subCategory.controller.js";
import { validation } from "../middleware/validation.js";
import { createSubCategorySchema, getSubCategorySchema, updateSubCategorySchema } from "./validation.subCategory.js";


const subCategoryRouter = express.Router({ mergeParams: true });

subCategoryRouter.post('/', validation(createSubCategorySchema), createsubCategory);
subCategoryRouter.get('/', getAllsubCategory);
subCategoryRouter.get('/:id', validation(getSubCategorySchema), getsubCategory);
subCategoryRouter.put('/:id', validation(updateSubCategorySchema), updatesubCategory);
subCategoryRouter.delete('/:id', validation(getSubCategorySchema), deletesubCategory);

export default subCategoryRouter;