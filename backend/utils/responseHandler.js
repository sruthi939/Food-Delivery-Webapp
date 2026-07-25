export const sendSuccess = (res, message = "Success", data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

export const sendError = (res, message = "Something went wrong", statusCode = 400, error = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: error ? error.message || error : null
    });
};
