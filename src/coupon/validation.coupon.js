import Joi from 'joi'


export const createCouponSchema = Joi.object({
    code:Joi.string().regex(/^[A-Z]{3,10}[0-9]{2}$/).required(),
    expires:Joi.date().required(),
    discount:Joi.number().integer().min(10).max(50).required()
})  
export const getUpdateDeleteCouponSchema = Joi.object({
    id:Joi.string().length(24).hex().required()
})

export const UpdateCouponSchema = Joi.object({
    id:Joi.string().length(24).hex().required(), 
    code:Joi.string().regex(/^[A-Z]{3,10}[0-9]{2}$/).required(),
    expires:Joi.date().required(),
    discount:Joi.number().integer().min(10).max(50).required()
})

