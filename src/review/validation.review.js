import Joi from 'joi'


export const createReviewSchema = Joi.object({
    product: Joi.string().length(24).hex().required(),
    comment: Joi.string().min(5).max(200).required(),
    rating: Joi.number().min(1).max(5)
})
export const getUpdateDeleteReviewSchema = Joi.object({
    id: Joi.string().length(24).hex().required()
})
export const UpdateReviewSchema = Joi.object({
    id: Joi.string().length(24).hex().required(),
    comment: Joi.string().min(5).max(200).required(),
    rating: Joi.number().min(1).max(5)
})
