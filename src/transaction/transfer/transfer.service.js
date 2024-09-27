import { executeQuery } from "../../config/database.js";

//function to make transfer
export const  makeTransfer = async (senderAccountNum,  receiverAccountNum, amount) => {

    try {
        
        await executeQuery('BEGIN')

        const senderAccount = await executeQuery('select * from accounts where acctNumber = $1', [senderAccountNum])

        if (senderAccount.length <= 0){
            throw new Error('Sender account does not exist. ')
        }

        if (parseFloat(senderAccount[0].balance) < amount){
            throw new Error('Insufficient balance!!')
        }

        const recieverAccount = await executeQuery('select * from accounts where acctNumber = $1', [receiverAccountNum])

        if (recieverAccount.length <= 0){
            throw new Error('Reciever account does not exist.')
        }

        await executeQuery('update accounts set balance = balance - $1 where acctNumber = $2', [amount, senderAccountNum])

        await executeQuery('update accounts set balance = balance + $1 where acctNumber = $2', [amount, receiverAccountNum])

        await  executeQuery('COMMIT');

        return senderAccount

        //console.log('transfer successful')

    } catch (error) {

        await executeQuery('rollback')
        console.error('Transfer failed, transaction rolled back')
        throw new Error(error)
    }

};

//pass account number to this function while making your transfer, deposit and withdrawal
export const accountFunction = async(accNum) => {
    try {
        const query = `SELECT * FROM accounts WHERE acctNumber = $1`;

        const results = await executeQuery(query, [accNum])

        return results;
    } catch (error) {
        throw new Error(error);
    }
};

//function to post to transfers table
export const postTransfer = async (senderAccountNum, receiverAccountNum, amount) => {
    try {
        
        const query = `INSERT INTO transfers (fromAccountNumber, toAccountNumber, amount) VALUES ($1, $2, $3) RETURNING *`;

        const result = await executeQuery(query, [senderAccountNum, receiverAccountNum, amount])
        return result;
    } catch (error) {
        throw new Error(error)
    }

}
