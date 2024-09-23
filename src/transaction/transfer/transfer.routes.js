import { transfer } from "./transfer.controller.js";
import { Router } from "express";
import { verifyUser } from "../../middlewares/verifyUsers.js";


export const transferRouter = Router()

transferRouter.post('/',  verifyUser, transfer)
