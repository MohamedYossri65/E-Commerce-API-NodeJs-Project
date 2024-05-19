
export const globalErrorHandlingMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    if(process.env.MODE = 'dev'){
        res.status(statusCode).json({
            error: err.message,
            statusCode,
            stackTrace: err.stack
        });
    }else{
        res.status(statusCode).json({
            error: err.message,
            statusCode
        });
    }
}