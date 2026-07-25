import jwt from "jsonwebtoken";

export const generateToken = (id, role = "user") => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || "goldfork_secret_key_2026_jwt_token", {
        expiresIn: process.env.JWT_EXPIRE || "7d"
    });
};
