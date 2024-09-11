import express from "express";
import { config } from "./config/env.js";
import { createUserTable } from "./user/user.model.js";
import { accountTable } from "./account/account.model.js";
import { sign_up, getAllUsers, userById, deleteUserById } from "./user/user.controller.js";

// import { getAllUsers } from "./user/user.controller.js";
// import { userById } from "./user/user.controller.js";
// import { deleteUserById } from "./user/user.controller.js";

const app = express();

app.use(express.json());

app.get("/get-users", getAllUsers);
app.get("/get-users/:id", userById);
app.post("/sign-up", sign_up);
app.delete("/delete-user/:id", deleteUserById);




app.listen(config.port, () => {
    createUserTable();
    accountTable();
    console.log(`server running on port ${config.port}`)
});