import { makeTransfer, accountNumberFunction, postTransfer } from "./transfer.service.js";
import { transferSchema } from "./transfer.validator.js";
import { converter } from "../../utils/converter.js";



export const  transfer = async (req, res) => {

    try {
        
        const user = req.user;

        const  { error, value} = transferSchema.validate(req.body)

        if  (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const { senderAccountNum, receiverAccountNum, amount} = value;
         
        let transferAmount;

        const [senderAcct] = await accountNumberFunction(senderAccountNum);

        const [recieverAcct] = await accountNumberFunction(receiverAccountNum)
                
        if (!senderAcct){
            return res.status(404).json({ message: 'Sender account does not exist...'})
        };

        if (parseFloat(senderAcct.balance) < amount){
            return res.status(403).json({ message: 'Insufficient balance!!!'})
        };

        if (senderAcct.userid !== user.id){
            return res.status(403).json({ message: "You are not the owner of this account"})
        }

        if (senderAccountNum === receiverAccountNum) {
            return res.status(400).json({ message: "Cannot transfer to the same account." });
        }

        if (!recieverAcct){
            return res.status(404).json({ message: 'Reciever account does not exist...'})
        };
        
        if(amount < 0) {
            return res.status(400).json({ message: 'Amount cannot be a negative number'})
        }
        
        //currency converter
        transferAmount = parseFloat(amount);

        if(senderAcct.currency != recieverAcct.currency) {

            transferAmount = await converter(senderAcct.currency, recieverAcct.currency, amount);

        }
        

        await makeTransfer(senderAccountNum, receiverAccountNum, amount, transferAmount);

        const trans = await postTransfer(senderAccountNum, receiverAccountNum, amount);
        

        return res.status(200).json({
            message: "transfer successful",
            trans
        })


    } catch (error) {

        console.error(error)
        return res.status(500).json({ message: `Internal Server Error, ${error}` });
        
    }
}



