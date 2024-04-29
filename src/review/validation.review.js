import Joi from 'joi'


export const createReviewSchema = Joi.object({
    product: Joi.string().length(24).hex().required()
})
export const getUpdateDeleteReviewSchema = Joi.object({
    id: Joi.string().length(24).hex().required()
})
