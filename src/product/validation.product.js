import Joi from 'joi'


export const createProductSchema = Joi.object({
    title: Joi.string().min(2).max(20).required(),
    price: Joi.number()
        .integer()
        .min(100)
        .max(50000)
        .required()
    , priceAfterDiscount: Joi.number()
        .integer()
        .min(100)
        .max(50000)
    , ratingCount: Joi.number()
        .integer()
        .min(0)
    , ratingAvg: Joi.number()
        .integer()
        .min(1)
        .max(5)
    , description: Joi.string().min(5).max(300).required(),
    quantity: Joi.number()
        .integer()
        .min(0)
        .max(10)
    , sold: Joi.number()
        .integer()
        .min(0)
    , category: Joi.string().length(24).hex().required()
    , brands: Joi.string().length(24).hex().required()
    , subCategory: Joi.string().length(24).hex().required()
})
export const getProductSchema = Joi.object({
    id: Joi.string().length(24).hex().required()
})
export const updateProductSchema = Joi.object({
    id: Joi.string().length(24).hex().required(),
    title: Joi.string().min(2).max(20)
})
