import Joi from 'joi'


export const createBrandSchema = Joi.object({
    name:Joi.string().min(2).max(20).required()
})
export const getBrandsSchema = Joi.object({
    id:Joi.string().length(24).hex().required()
})
export const updateBrandsSchema = Joi.object({
    id:Joi.string().length(24).hex().required(),
    name:Joi.string().min(2).max(20)
})
