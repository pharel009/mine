import { createUser, getUsers, getUserById, removeUserById, getUserByEmail } from "./user.services.js";
import { signupSchema } from "./user.validator.js";
import { hashpassword } from "./utils/bcrypt.js";

// import { getUsers } from "./user.services.js";
// import { getUserById } from "./user.services.js";
// import { removeUserById } from "./user.services.js";


//post controller
export const sign_up = async (req, res) => {

    const { error, value } = signupSchema.validate(req.body);
     
    if(error) return res.status(400).json({
        message: error.details[0].message
    })

    const { first_name, last_name, email, password } = value;

    const hashedpassword = await hashpassword(password);

    const userExists = await getUserByEmail(email);

    if (userExists.length > 0) return res.status(409).json({
        message: `User with email ${email} already exists`
    })

    

    const newUser = await createUser(first_name, last_name, email, hashedpassword);

    return res.status(201).json({
        message: "User created",
        newUser
    })

};

//get all users controller
export const getAllUsers = async (req, res) => {
    const allUsers = await getUsers();

    return res.status(200).json({
        message: `There are ${allUsers.length} users`,
        allUsers
    })
};

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
};