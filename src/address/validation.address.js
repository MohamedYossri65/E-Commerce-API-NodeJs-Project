import Joi from 'joi'


export const addToAddressesSchema = Joi.object({
    street :Joi.string().min(2).max(20).required(),
    city:Joi.string().min(2).max(20).required(),
    phone:Joi.string().length(11).required()
})  

export const deleteFromAddressesSchema = Joi.object({
    addressId:Joi.string().hex().length(24).required()
})  
