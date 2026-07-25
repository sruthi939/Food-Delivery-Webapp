import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// In-memory fallback users if DB is offline
const inMemoryUsers = [];

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "goldfork_secret_key_2026", { expiresIn: "7d" });
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    try {
        let user = null;
        try {
            user = await userModel.findOne({ email });
        } catch (dbErr) {
            user = inMemoryUsers.find(u => u.email === email);
        }

        if (!user) {
            // Check fallback store
            user = inMemoryUsers.find(u => u.email === email);
        }

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id || user.id);
        res.json({
            success: true,
            token,
            message: "Login successful",
            user: { id: user._id || user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Server error during login" });
    }
};

// Register User
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Please fill in all fields" });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    try {
        let exists = false;
        try {
            exists = await userModel.findOne({ email });
        } catch (dbErr) {
            exists = inMemoryUsers.some(u => u.email === email);
        }

        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser = null;
        try {
            newUser = await userModel.create({
                name,
                email,
                password: hashedPassword,
                cartData: {}
            });
        } catch (dbErr) {
            newUser = { id: `user_${Date.now()}`, name, email, password: hashedPassword, cartData: {} };
            inMemoryUsers.push(newUser);
        }

        const token = createToken(newUser._id || newUser.id);
        res.json({
            success: true,
            token,
            message: "Account created successfully",
            user: { id: newUser._id || newUser.id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ success: false, message: "Server error during registration" });
    }
};
