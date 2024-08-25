

const validation = (schema) => {
    return async (req, res, next) => {
        let inputs = { ...req.body, ...req.params, ...req.query };
        const { error } = schema.validate(inputs, { abortEarly: false });

        const language = req.query.lang || req.headers['accept-language'] || 'en';
        if (error?.details) {
            const errorMessages = await Promise.all(
                error.details.map(async (detail) => await detail.message)
            );

            res.status(400).json({
                status: 'fail',
                message: 'Validation error',
                data: { errors: errorMessages }
            });

        } else {
            next();
        }
    };
};

export { validation }