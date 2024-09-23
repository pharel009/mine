import { createUser, getUsers, getUserById, removeUserById, getUserByEmail, getUserByPhoneNumber, getUserAccount } from "./user.services.js";
import { signupSchema, loginSchema } from "./user.validator.js";
import { hashpassword, comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { sanitize, sanitizeUserArray } from "../utils/sanitizeUser.js";


//post controller to sign up
export const sign_up = async (req, res) => {
    try {

        const { error, value } = signupSchema.validate(req.body);
     
        if(error) return res.status(400).json({
            message: error.details[0].message
        })
    
        const { firstName, lastName, email, phoneNumber, password } = value;
    
        const hashedpassword = await hashpassword(password);
    
        const userExists = await getUserByEmail(email);
    
        const userNumExists = await getUserByPhoneNumber(phoneNumber)
    
        if (userExists.length > 0 || userNumExists.length > 0) return res.status(409).json({
            message: `User with email or phone number already exists`
        })
    
        const [newUser] = await createUser(firstName, lastName, email, phoneNumber, hashedpassword);
    
        return res.status(201).json({
            message: "User created",
            data: sanitize(newUser)
        })

    } catch (error) {
        console.log("Error creating user", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }


};

//get all users controller
export const getAllUsers = async (req, res) => {

    try {
        
        const allUsers  = await getUsers();
    
        return res.status(200).json({
            message: `There ${allUsers.length} users`,
            data: sanitizeUserArray(allUsers)
        })

    } catch (error) {
        console.log("Cannot get all users",error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
  
};

//get user by id controller
export const userById = async (req, res) => {

    try {
        const { id } = req.params;

        const [singleUser] = await getUserById(id)
    
        return res.status(200).json({
            message: `This is a user`,
            data: sanitize(singleUser)
        })
    } catch (error) {
        console.log("User doesn't exists ",error);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
   
};

//delete user by id controller
export const deleteUserById = async (req, res) => {

    try {
        const { id } = req.params;

        const [delSingleUser] = await removeUserById(id);
    
        return res.status(200).json({
            message: `Deletion of this user is successful`,
            data: sanitize(delSingleUser)
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
  
};



//post controller to login
export const login = async (req, res) => {

    try {
        
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
    
            message: "Wrong password!!!"
        })
    
        const accessToken = generateToken(sanitize(user))
    
        return res.status(200).json({
            message: "Your login is successful",
            accessToken: accessToken
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }

};


export const getUserAccounts = async (req , res) =>{
    try {
        const user = req.user

        if(!user){
            return res.status(401).json({
                message: "You are not logged in!!!"
            })
        }

        const accounts = await getUserAccount(user.id);

        return res.status(200).json({
            message: "This are all your accounts",
            accounts: accounts
        })


    } catch (error) {

        console.log(error)
        return res.status(500).json({
            mesage: "internal server error"
        })
        
    }
}