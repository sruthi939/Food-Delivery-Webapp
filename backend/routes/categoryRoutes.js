import express from "express";
import { getCategories, addCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/list", getCategories);
categoryRouter.post("/add", addCategory);

export default categoryRouter;
