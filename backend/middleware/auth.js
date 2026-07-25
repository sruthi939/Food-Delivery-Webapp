import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized. Please login again.' });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET || 'goldfork_secret_key_2026');
        req.body.userId = token_decode.id;
        req.userId = token_decode.id;
        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

export default authMiddleware;
