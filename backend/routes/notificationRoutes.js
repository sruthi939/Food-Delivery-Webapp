import express from "express";
import { getNotifications } from "../controllers/notificationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const notificationRouter = express.Router();

notificationRouter.get("/list", authMiddleware, getNotifications);

export default notificationRouter;
