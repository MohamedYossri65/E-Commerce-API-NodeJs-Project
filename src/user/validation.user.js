
import Joi from 'joi'


export const createUserSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().length(11),
    password:Joi.string()
})
export const getUsersSchema = Joi.object({
    id: Joi.string().length(24).hex().required(),
    password:Joi.string()
})
export const updateUsersSchema = Joi.object({
    id: Joi.string().length(24).hex().required(),
    name: Joi.string().min(2).max(20),
    email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
