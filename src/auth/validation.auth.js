import Joi from 'joi'


export const signUpSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().length(11).required(),
    password: Joi.string().length(8).required(),
    role: Joi.string()
})

export const signInSchema = Joi.object({
    id: Joi.string().length(24).hex().required(),
    password: Joi.string().length(8).required(),
})