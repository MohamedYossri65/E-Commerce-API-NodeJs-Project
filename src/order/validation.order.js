import Joi from 'joi'


export const createOrderSchema = Joi.object({
    shipingAddress: Joi.object({
        street: Joi.string().min(5).max(20).required(),
        city: Joi.string().min(3).max(20).required(),
        phone: Joi.string().pattern(/^01[0-9]{9}$/).required()
    })
})
export const createCheckoutSissonSchema = Joi.object({
    id: Joi.string().length(24).hex().required(),
    shipingAddress: Joi.object({
        street: Joi.string().min(5).max(20).required(),
        city: Joi.string().min(3).max(20).required(),
        phone: Joi.string().pattern(/^01[0-9]{9}$/).required()
    })
})
