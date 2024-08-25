import { AppError } from "../utils/AppError.js";

//send value that not id in params
const handelCastError = (err) => {
    const message = `Invalid ${err.path} : ${err.value}`;
    return new AppError(message, 400);
}
//duPlicate key error
const handelDuPlicateError = (err) => {
    const value = err.errorResponse.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
}
//error in validation like max value or number of characters
const handelValidationError = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

//
const handelJsonWebTokenError = (err) => {
    let message = `Invalid token. ${err.message}`;
    return new AppError(message, 401);
}

// Function to handle errors in production environment
const sendErrProduction = async (err, res, req) => {
    //operational error
    if (err.isOperationlError) {
        // Set statusCode to the error's statusCode or default to 500 if not set
        let statusCode = err.statusCode || 500;
        // Send a JSON response with the error status and message
        res.status(statusCode).json({
            status: err.status,
            message: err.message
        });

        //programming error 
    } else {
        // Log the error to the console for debugging
        console.error('ERROR', err);
        // Send a generic error response
        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        });
    }
}

// Function to handle errors in development environment
const sendErrDeveolpment = async (err, res, req) => {
    // Set statusCode to the error's statusCode or default to 500 if not set
    let statusCode = err.statusCode || 500;
    // Send a JSON response with detailed error information
    res.status(statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    });
}

// Global error handling middleware
const globalErrorHandlingMiddleware = async (err, req, res, next) => {


    // Check the environment and call the appropriate error handling function
    if (process.env.NODE_ENV == 'development') {
        await sendErrDeveolpment(err, res, req);
    } else if (process.env.NODE_ENV == 'production') {
        let error = { ...err };
        error.message = err.message;
        //send value that not id in params
        if (error.name == 'castError') error = handelCastError(error);
        //duPlicate key error
        if (error.code === 11000) error = handelDuPlicateError(error);
        //error in validation like max value or number of characters
        if (error.name == 'validationError') error = handelValidationError(error);

        if (error.name == 'JsonWebTokenError' || error.name == 'TokenExpiredError') error = handelJsonWebTokenError(error);

        await sendErrProduction(error, res, req);
    }
};

export { globalErrorHandlingMiddleware };