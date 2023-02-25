import express from "express"
import { UserController } from "../UserController"


export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup",(req,res) => userController.createUser(req,res));
userRouter.post("/login", (req,res) => userController.login(req,res));

userRouter.get("/profile", (req,res) => userController.getProfile(req,res));
userRouter.get("/all-users", (req,res) => userController.getAllUsers(req,res));
