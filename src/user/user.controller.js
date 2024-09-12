import { createUser, getUsers, getUserById, removeUserById, getUserByEmail } from "./user.services.js";
import { signupSchema, loginSchema } from "./user.validator.js";
import { hashpassword, comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { sanitize } from "../utils/sanitizeUser.js";

//post controller to sign up
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

    

    const [newUser] = await createUser(first_name, last_name, email, hashedpassword);

    return res.status(201).json({
        message: "User created",
        data: sanitize(newUser)
    })

};

//get all users controller
export const getAllUsers = async (req, res) => {
    const allUsers  = await getUsers();

    return res.status(200).json({
        message: `There are  users`,
        data: sanitize(allUsers)
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



//post controller to login
export const login = async (req, res) => {

    const { error, value } = loginSchema.validate(req.body)

    if (error) return res.status(400).json({
        message: error.details[0].message
    })


//checking if email and password match with the one the user used while signing in when a user want to login
    const { email, password } = value;

    //checking for email
    const [user] = await getUserByEmail(email)

    if (!user) return res.status(404).json({
        message: "No user with this email!!!"
    })

    //checking for password
    const isMatch = await comparePassword(password, user.password)

    if (!isMatch) return res.status(403).json({

        message: "Wrong password"
    })

    const accessToken = generateToken(sanitize(user))

    return res.status(200).json({
        message: "Your login is successful",
        accessToken: accessToken
    })

};
