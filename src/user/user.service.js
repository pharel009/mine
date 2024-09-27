import { executeQuery } from "../config/database.js";
import { v4 as uuidv4 } from "uuid";


//create user query
export const createUser = async (firstName, lastName, email,phoneNumber, password) => {
    try {
        const userId = uuidv4();
        const query = `INSERT INTO users (Id, firstName, lastName, email, phoneNumber, password) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
               
        const result = await executeQuery(query, [userId, firstName, lastName, email,phoneNumber, password]);

        return result;
    } catch (error) {
        throw new Error(error)
    }
};

//get users by email query
export const getUserByEmail = async (email) => {
    try {
        const query = `SELECT * FROM users WHERE email = $1`

        const result = await executeQuery(query, [email])

        return result;
    } catch (error) {
        throw new Error(error)
    }
};

//get users by phone number
export const getUserByPhoneNumber = async(phonenumber) => {
    try {
        const query = `SELECT * FROM users WHERE phoneNumber =$1`

        const result = await executeQuery(query, [phonenumber]);

        return result
    } catch (error) {
        throw new Error(error)
    }
};

//get all users query
export const getUsers = async () => {
    try {
        const query = `SELECT * FROM users ORDER BY id ASC`

        const result = await executeQuery(query);

        return result;

    } catch (error) {
        throw new Error(error)
    }
};

//get single user by id query
export const getUserById = async (id) => {
    try{
        const query = `SELECT * FROM users WHERE Id = $1`;

        const result = await executeQuery(query, [id]);

        return result;
    } catch (error) {
        throw new Error(error)
    }
};



//delete user by id query
export const removeUserById = async (id) => {
    try {
        const query = `DELETE FROM users WHERE id = $1 RETURNING *`

        const result = await executeQuery(query, [id]);

        return result;
    } catch (error) {
        throw new Error(error)
    }
};

//get user accounts
export const getAccount = async(userId) => {
    try {
        const query = `SELECT * FROM accounts WHERE userId = $1`;

        const results = await executeQuery(query, [userId])

        return results;
    } catch (error) {
        throw new Error(error);
    }
};