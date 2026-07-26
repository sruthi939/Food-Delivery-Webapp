import express from "express";
import { addContactMessage, getContactMessages } from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/", addContactMessage);
contactRouter.post("/add", addContactMessage);
contactRouter.get("/list", getContactMessages);

export default contactRouter;
