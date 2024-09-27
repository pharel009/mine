import { Router } from "express";
import { withdrawal } from "./withdrawal.controller.js";
import { verifyUser } from "../../middlewares/verifyUsers.js";



export const withdrawalRouter = Router();

withdrawalRouter.post('/', verifyUser, withdrawal);