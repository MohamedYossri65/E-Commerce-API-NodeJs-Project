import Joi from 'joi'


export const addDeleteToWhishlistSchema = Joi.object({
    product: Joi.string().length(24).hex().required()
})