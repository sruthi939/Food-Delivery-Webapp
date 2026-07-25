export const adminMiddleware = (req, res, next) => {
    if (req.userRole && req.userRole === "admin") {
        next();
    } else {
        return res.status(403).json({ success: false, message: "Access denied. Admin privileges required." });
    }
};
