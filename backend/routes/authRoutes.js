import express from "express";
import { register, login } from "../controllers/authController.js";
import { validateRegistration } from "../middleware/validationMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", validateRegistration, register);
authRouter.post("/login", login);

export default authRouter;
