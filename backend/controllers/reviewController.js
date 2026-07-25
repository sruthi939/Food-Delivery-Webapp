import Review from "../models/Review.js";

export const addReview = async (req, res) => {
    try {
        const { foodId, rating, comment } = req.body;
        const review = new Review({ foodId, userId: req.userId, userName: req.body.userName || "Customer", rating, comment });
        await review.save();
        res.status(201).json({ success: true, message: "Review added", review });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getFoodReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ foodId: req.params.foodId }).sort({ createdAt: -1 });
        res.json({ success: true, data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
