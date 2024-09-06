import { createUser } from "./user.services.js";
import { getUsers } from "./user.services.js";
import { getUserById } from "./user.services.js";
import { removeUserById } from "./user.services.js";


//post controller
export const sign_up = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    const newUser = await createUser(first_name, last_name, email, password);

    return res.status(201).json({
        message: "User created",
        newUser
    })

};

//get all users controller
export const getAllUsers = async (req, res) => {
    const allUsers = await getUsers();

    return res.status(200).json({
        message: "These are all the users",
        allUsers
    })
}

//get user by id controller
export const userById = async (req, res) => {
    const { id } = req.params;

    const singleUser = await getUserById(id)

    return res.status(200).json({
        message: `This is a user with id ${id}`,
        singleUser
    })
};

//delete user by id controller
export const deleteUserById = async (req, res) => {
    const { id } = req.params;

    const delSingleUser = await removeUserById(id);

    return res.status(204).json({
        message: `User with id ${id} has been deleted!`,
        delSingleUser
    })
}