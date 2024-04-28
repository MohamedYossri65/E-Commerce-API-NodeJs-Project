import Joi from 'joi'


export const createCategorySchema = Joi.object({
    name:Joi.string().min(2).max(20).required()
})  
export const getCategorySchema = Joi.object({
    id:Joi.string().length(24).hex().required()
})
export const updateCategorySchema = Joi.object({
    id:Joi.string().length(24).hex().required(),
    name:Joi.string().min(2).max(20)
})
