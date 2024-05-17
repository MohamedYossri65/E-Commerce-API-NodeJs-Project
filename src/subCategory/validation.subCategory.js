import Joi from 'joi'


export const createSubCategorySchema = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    category: Joi.string().length(24).hex().required()
})
export const getSubCategorySchema = Joi.object({
    id: Joi.string().length(24).hex().required()
})
export const updateSubCategorySchema = Joi.object({
    id: Joi.string().length(24).hex().required(),
    name: Joi.string().min(2).max(200),
    category: Joi.string().length(24).hex().required()
})
