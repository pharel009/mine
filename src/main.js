import express from "express";
import { config } from "./config/env.js";
import { createUserTable } from "./user/user.model.js";
import { accountTable } from "./account/account.model.js";
import { createDepositTable } from "./transaction/deposit/deposit.model.js";
import { transferTable } from "./transaction/transfer/transfer.model.js";
import { withdrawalTable } from "./transaction/withdrawal/withdrawal.model.js";
import { userRouter } from "./user/user.routes.js";
import { AccountRouter } from "./account/account.routes.js";
import { transferRouter } from "./transaction/transfer/transfer.routes.js";
import { depositRouter } from "./transaction/deposit/deposit.routes.js";
import { withdrawalRouter } from "./transaction/withdrawal/withdrawal.routes.js";
import { altarTable } from "./user/user.service.js";


const app = express();

app.use(express.json());



app.use('/users', userRouter);
app.use('/accounts', AccountRouter);
app.use('/transfer', transferRouter);
app.use('/deposit', depositRouter);
app.use('/withdrawal', withdrawalRouter);



app.listen(config.port, () => {
    // createUserTable();
    // accountTable();
    // createDepositTable();
    // transferTable();
    // withdrawalTable();
    //altarTable()
    console.log(`server running on http://localhost:${config.port}`)
});