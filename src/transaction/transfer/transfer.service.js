import { executeQuery } from "../../config/database.js";


export const  makeTransfer = async (sourceId,  destinationId, amount) => {

    try {
        
        await executeQuery('BEGIN')

        const senderAccount = await executeQuery('select * from accounts where id = $1', [sourceId])

        if (senderAccount.length <= 0){
            throw new Error('Sender account does not exist. ')
        }

        if (parseFloat(senderAccount[0]. balance) < amount){
            throw new Error('Insufficient funds!!')
        }

        const recieverAccount = await executeQuery('select * from accounts where id = $1', [destinationId])

        if (senderAccount.length <= 0){
            throw new Error('Reciever account does not exist. ')
        }

        await executeQuery('update accounts set balance = balance - $1 where id = $2', [amount, sourceId])

        await executeQuery('update accounts set balance = balance + $1 where id = $2', [amount, destinationId])

        await  executeQuery('COMMIT');

        return senderAccount

        console.log('transfer successful')

    } catch (error) {

        await executeQuery('rollback')
        console.error('Transfer failed, transaction rolled back')
        throw new Error(error)
    }

}
