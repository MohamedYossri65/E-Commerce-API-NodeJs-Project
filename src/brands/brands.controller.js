
import { brandModel } from './../../database/models/brands.model.js';
import * as factor from '../handlers/factor.handler.js';



export const createBrand = factor.createOne(brandModel ,'brand');

export const getAllBrands = factor.getAll(brandModel);

export const getBrand = factor.getOne(brandModel ,'brand');

export const updateBrand = factor.updateOne(brandModel ,'brand');

export const deleteBrand = factor.deleteOne(brandModel ,'brand');