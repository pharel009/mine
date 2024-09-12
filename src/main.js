import express from "express";
import { config } from "./config/env.js";
import { createUserTable } from "./user/user.model.js";
import { accountTable } from "./account/account.model.js";
import { sign_up, login, getAllUsers, userById, deleteUserById } from "./user/user.controller.js";


const app = express();

app.use(express.json());

app.get("/get-users", getAllUsers);
app.get("/get-users/:id", userById);
app.post("/sign-up", sign_up);
app.post("/login", login);
app.delete("/delete-user/:id", deleteUserById);




app.listen(config.port, () => {
    createUserTable();
    accountTable();
    console.log(`server running on port ${config.port}`)
});