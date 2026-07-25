import User from "../models/User.js";

export const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const user = await User.findById(userId);
        let cartData = user ? (user.cartData || {}) : {};
        cartData[itemId] = (cartData[itemId] || 0) + 1;
        if (user) await User.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to Cart", cartData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const user = await User.findById(userId);
        let cartData = user ? (user.cartData || {}) : {};
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) delete cartData[itemId];
        }
        if (user) await User.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed from Cart", cartData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.userId || req.body.userId);
        res.json({ success: true, cartData: user ? (user.cartData || {}) : {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
