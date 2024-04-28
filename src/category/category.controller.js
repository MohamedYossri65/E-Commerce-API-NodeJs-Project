

import { categoryModel } from "../../database/models/category.model.js";

import * as factor from './../handlers/factor.handler.js';



export const createCategory = factor.createOne(categoryModel ,'category');

export const getAllCategories = factor.getAll(categoryModel);

export const getCategory = factor.getOne(categoryModel ,'category');

export const updateCategory = factor.updateOne(categoryModel ,'category');

export const deleteCategory = factor.deleteOne(categoryModel ,'category');