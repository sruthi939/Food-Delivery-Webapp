import express from "express";
import { getFoods, getFoodById, addFood, removeFood } from "../controllers/foodController.js";
import { uploadSingleImage } from "../middleware/uploadMiddleware.js";

const foodRouter = express.Router();

foodRouter.get("/list", getFoods);
foodRouter.get("/:id", getFoodById);
foodRouter.post("/add", uploadSingleImage("image"), addFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
