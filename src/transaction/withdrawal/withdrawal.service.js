import { executeQuery } from "../../config/database.js";

//function to make withdrawal
export const makeWithdrawal = async (accountNumber, amount) => {

    try {
        
        await executeQuery('BEGIN')

        const account = await executeQuery('select * from accounts where acctNumber = $1', [accountNumber])

        if (account.length <= 0) throw new Error('Withdrawal account is not valid')

        if (parseFloat(account[0].balance) < amount){
            throw new Error('Insufficient funds!!!')
        }

        await executeQuery('update accounts set balance = balance - $1 where acctNumber = $2', [amount, accountNumber])

        return account;

        //console.log('Withdrawal successful');

    } catch (error) {
        
        await executeQuery('rollback')
        console.error('Withdrawal failed, transaction rolled back');
        throw new Error(error)
    }
};

//function to post withdrawals table
export const postWithdrawal = async (accountNumber, amount) => {
    try {
        
        const query = `INSERT INTO withdrawals (acctNumber, amount) VALUES ($1, $2) RETURNING *`;
        const result = await executeQuery(query, [accountNumber, amount]);
        return result;
    } catch (error) {
        throw new Error(error)
    }
};