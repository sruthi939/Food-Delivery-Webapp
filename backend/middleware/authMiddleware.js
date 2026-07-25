import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Login required." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "goldfork_secret_key_2026_jwt_token");
        req.body.userId = decoded.id;
        req.userId = decoded.id;
        req.userRole = decoded.role || "user";
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Token verification failed. Please login again." });
    }
};
