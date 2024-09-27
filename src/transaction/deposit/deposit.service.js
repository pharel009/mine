import { executeQuery } from "../../config/database.js";

//function to make a deposit into a user's account
export const makeDeposit = async (senderId ,receiverAccountNum, amount) => {

    try {
        await executeQuery('BEGIN')

        const sender = await executeQuery(`SELECT * FROM users WHERE id = $1`, [senderId])

        if (sender.lenght <= 0) {
            throw new Error(`You are not a valid sender`)
        }
        const recieverAccount = await executeQuery('select * from accounts where acctNumber = $1', [receiverAccountNum])

        if (recieverAccount.length <= 0) throw new Error('Destination account does not exists!!!.')

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
export const postDeposit = async (senderId, receiverAccountNum, amount) => {
    try {
        
        const query = `INSERT INTO deposits (userId, acctNumber, amount) VALUES ($1, $2, $3) RETURNING *`;
        const result = await executeQuery(query, [senderId, receiverAccountNum, amount]);
        return result;
    } catch (error) {
        throw new Error(error)
    }

};