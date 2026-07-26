import express from "express";
import { getCategories, addCategory, removeCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/list", getCategories);
categoryRouter.post("/add", addCategory);
categoryRouter.post("/remove", removeCategory);

export default categoryRouter;
