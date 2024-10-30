import { executeQuery } from "../../config/database.js";

//function to make a deposit into a user's account
export const makeDeposit = async (depositorId ,receiverAccountNum, amount) => {

    try {
        await executeQuery('BEGIN')

        const depositor = await executeQuery(`SELECT * FROM users WHERE id = $1`, [depositorId])

        const recieverAccount = await executeQuery('select * from accounts where acctNumber = $1', [receiverAccountNum])

        await executeQuery('update accounts set balance = balance + $1 where acctNumber = $2', [amount, receiverAccountNum])
        
        await executeQuery('COMMIT');

        return recieverAccount;

        //console.log('Deposit successful');
    } catch (error) {
        
        await executeQuery('rollback')
        console.error('Deposit failed, transaction rolled back');
        throw new Error(error)
    }
}

//function to post to deposits table
export const postDeposit = async (depositorId, receiverAccountNum, amount) => {
    try {
        
        const query = `INSERT INTO deposits (userId, acctNumber, amount) VALUES ($1, $2, $3) RETURNING *`;
        const result = await executeQuery(query, [depositorId, receiverAccountNum, amount]);
        return result;
    } catch (error) {
        throw new Error(error)
    }

};