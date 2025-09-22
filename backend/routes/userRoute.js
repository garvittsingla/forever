import express from "express"
import { adminLogin, loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();
//http:localhost:4000/api/user/register
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/admin",adminLogin);

export default userRouter