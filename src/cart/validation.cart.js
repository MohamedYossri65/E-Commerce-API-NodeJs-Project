import Joi from 'joi'


export const addProductToCartSchema = Joi.object({
    product:Joi.string().length(24).hex().required()
})  
export const deleteProductFromCartSchema = Joi.object({
    id:Joi.string().length(24).hex().required()
})
export const updateQuantitySchema = Joi.object({
    product:Joi.string().length(24).hex().required()
})
export const upplayCouponSchema = Joi.object({
    code:Joi.string().regex(/^[A-Z]{3,10}[0-9]{2}$/).required()
})

