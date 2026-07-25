import express from "express";
import { toggleWishlist, getWishlist } from "../controllers/wishlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/toggle", authMiddleware, toggleWishlist);
wishlistRouter.get("/list", authMiddleware, getWishlist);

export default wishlistRouter;
