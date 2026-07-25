import Wishlist from "../models/Wishlist.js";

export const toggleWishlist = async (req, res) => {
    try {
        const { userId, foodId } = req.body;
        let wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            wishlist = new Wishlist({ userId, foods: [foodId] });
        } else {
            const index = wishlist.foods.indexOf(foodId);
            if (index > -1) wishlist.foods.splice(index, 1);
            else wishlist.foods.push(foodId);
        }
        await wishlist.save();
        res.json({ success: true, message: "Wishlist updated", wishlist: wishlist.foods });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.userId }).populate("foods");
        res.json({ success: true, data: wishlist ? wishlist.foods : [] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
