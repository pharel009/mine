import { Router } from "express";
import { sign_up, login, getAllUsers, userById, deleteUserById, getUserAccounts } from "./user.controller.js";
import { verifyUser } from "../middlewares/verifyUsers.js";

export const userRouter = Router()

userRouter.post('/sign-up', sign_up);
userRouter.post('/login', login);
userRouter.get('/get-users', verifyUser, getAllUsers);
userRouter.get('/get-users/:id', userById);
userRouter.delete('/delete-user/:id', deleteUserById);
userRouter.get('/accounts',  verifyUser, getUserAccounts);




