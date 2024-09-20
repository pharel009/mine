import express from "express";
import { config } from "./config/env.js";
import { createUserTable } from "./user/user.model.js";
import { accountTable } from "./account/account.model.js";
import { userRouter } from "./user/user.route.js";
import { AccountRouter } from "./account/account.route.js";


const app = express();

app.use(express.json());



app.use('/users', userRouter);
app.use('/accounts', AccountRouter);



app.listen(config.port, () => {
    createUserTable();
    accountTable();
    console.log(`server running on http://localhost:${config.port}`)
});