import express from "express";
import { addReview, getFoodReviews, getAllReviews } from "../controllers/reviewController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", authMiddleware, addReview);
reviewRouter.get("/list", getAllReviews);
reviewRouter.get("/:foodId", getFoodReviews);

export default reviewRouter;
