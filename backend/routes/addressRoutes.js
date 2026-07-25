import express from "express";
import { addAddress, getAddresses } from "../controllers/addressController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const addressRouter = express.Router();

addressRouter.post("/add", authMiddleware, addAddress);
addressRouter.get("/list", authMiddleware, getAddresses);

export default addressRouter;
