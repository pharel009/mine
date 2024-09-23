import { executeQuery } from "../config/database.js";
import { v4 as uuidv4 } from "uuid";


//query to create an account
export const createAcoount = async (userId, accountNumber, currency, type) => {
    try {

        const query = `INSERT INTO accounts (id, userid, acctnumber, currency, type)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;

        const result = await executeQuery(query, [uuidv4(), userId, accountNumber, currency, type])

        return result;
    } catch (error) {
        throw new Error(error)
    }
};

//query to check account number
export const getAccountNumber = async(accountNumber) => {
    try {
        const query = `SELECT * FROM accounts WHERE acctNumber = $1`;

        const results = await executeQuery(query, [accountNumber])

        return results;
    } catch (error) {
        throw new Error(error);
    }
};



export const getAccount = async(id) => {
    try {
        const query = `SELECT * FROM accounts WHERE id = $1`;

        const results = await executeQuery(query, [id])

        return results;
    } catch (error) {
        throw new Error(error);
    }
};

