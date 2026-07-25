export const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Endpoint Not Found - ${req.originalUrl}`
    });
};
