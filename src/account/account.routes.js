import { Router } from "express";
import { createAcountController } from "./account.controller.js";
import { verifyUser } from "../middlewares/verifyUsers.js";

export const AccountRouter = Router();

AccountRouter.post('/create', verifyUser, createAcountController);