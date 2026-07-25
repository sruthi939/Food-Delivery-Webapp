import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { register, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", authMiddleware, getProfile);
userRouter.put("/profile", authMiddleware, updateProfile);

export default userRouter;
