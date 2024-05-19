import Joi from 'joi'


export const signUpSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().length(11),
    password: Joi.string().length(8),
    googleId: Joi.string().length(21),
    role: Joi.string()
})

export const signInSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().length(8).required(),
})