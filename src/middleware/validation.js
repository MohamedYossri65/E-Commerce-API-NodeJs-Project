


export const validation = (schema) => {
    return (req, res, next) => {
        let inputs = { ...req.body, ...req.params, ...req.query };
        const { error } = schema.validate(inputs, { abortEarly: false });
        if (error?.details) {
            res.json(error.details.map((detail) => detail.message));
        } else {
            next();
        }
    };
};
