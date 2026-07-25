import express from "express";
import { uploadFile } from "../controllers/uploadController.js";
import { uploadSingleImage } from "../middleware/uploadMiddleware.js";

const uploadRouter = express.Router();

uploadRouter.post("/", uploadSingleImage("file"), uploadFile);

export default uploadRouter;
