import { Router } from "express";
import { deposit } from "./deposit.controller.js";
import { verifyUser } from "../../middlewares/verifyUsers.js";


export const depositRouter = Router();

depositRouter.post('/', verifyUser, deposit)