import userModel from "../models/userModel.js";

// Temporary fallback in-memory cart store if DB is offline
const inMemoryCarts = {};

// Add Item to User Cart
export const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        let userData = null;

        try {
            userData = await userModel.findById(userId);
        } catch (dbErr) {
            userData = null;
        }

        if (userData) {
            let cartData = userData.cartData || {};
            cartData[itemId] = (cartData[itemId] || 0) + 1;
            await userModel.findByIdAndUpdate(userId, { cartData });
            return res.json({ success: true, message: "Added to Cart", cartData });
        } else {
            if (!inMemoryCarts[userId]) inMemoryCarts[userId] = {};
            inMemoryCarts[userId][itemId] = (inMemoryCarts[userId][itemId] || 0) + 1;
            return res.json({ success: true, message: "Added to Cart", cartData: inMemoryCarts[userId] });
        }
    } catch (error) {
        console.error("Add to Cart Error:", error);
        res.status(500).json({ success: false, message: "Error adding item to cart" });
    }
};

// Remove Item from User Cart
export const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        let userData = null;

        try {
            userData = await userModel.findById(userId);
        } catch (dbErr) {
            userData = null;
        }

        if (userData) {
            let cartData = userData.cartData || {};
            if (cartData[itemId] > 0) {
                cartData[itemId] -= 1;
                if (cartData[itemId] === 0) delete cartData[itemId];
            }
            await userModel.findByIdAndUpdate(userId, { cartData });
            return res.json({ success: true, message: "Removed from Cart", cartData });
        } else {
            if (inMemoryCarts[userId] && inMemoryCarts[userId][itemId] > 0) {
                inMemoryCarts[userId][itemId] -= 1;
                if (inMemoryCarts[userId][itemId] === 0) delete inMemoryCarts[userId][itemId];
            }
            return res.json({ success: true, message: "Removed from Cart", cartData: inMemoryCarts[userId] || {} });
        }
    } catch (error) {
        console.error("Remove from Cart Error:", error);
        res.status(500).json({ success: false, message: "Error removing item from cart" });
    }
};

// Fetch User Cart Data
export const getCart = async (req, res) => {
    try {
        const { userId } = req.body;
        let userData = null;

        try {
            userData = await userModel.findById(userId);
        } catch (dbErr) {
            userData = null;
        }

        if (userData) {
            return res.json({ success: true, cartData: userData.cartData || {} });
        } else {
            return res.json({ success: true, cartData: inMemoryCarts[userId] || {} });
        }
    } catch (error) {
        console.error("Get Cart Error:", error);
        res.status(500).json({ success: false, message: "Error fetching cart data" });
    }
};
