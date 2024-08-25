import Joi from "joi";

export const addToAddressesSchema = Joi.object({
    street: Joi.string().min(3).max(20).required().messages({
        'string.min': 'Street must be at least 3 characters long.',
        'string.max': 'Street must not exceed 20 characters.',
        'any.required': 'Street is required.'
    }),
    city: Joi.string().min(2).max(20).required().messages({
        'string.min': 'City must be at least 3 characters long.',
        'string.max': 'City must not exceed 20 characters.',
        'any.required': 'City is required.'
    }),
    phone: Joi.string().length(11).pattern(/^\d+$/).required().messages({
        'string.length': 'Phone number must be exactly 11 digits.',
        'string.pattern.base': 'Phone number must contain only digits.',
        'any.required': 'Phone number is required.'
    })
});

export const deleteFromAddressesSchema = Joi.object({
    addressId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'Address ID must be a valid hexadecimal string.',
        'string.length': 'Address ID must be exactly 24 characters long.',
        'any.required': 'Address ID is required.'
    })
});
