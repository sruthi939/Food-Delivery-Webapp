import express from "express";
import { getSettings, updateSettings } from "../controllers/settingsController.js";

const settingsRouter = express.Router();

settingsRouter.get("/", getSettings);
settingsRouter.post("/update", updateSettings);
settingsRouter.put("/update", updateSettings);

export default settingsRouter;
