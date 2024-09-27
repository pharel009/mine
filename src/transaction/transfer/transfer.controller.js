import { makeTransfer, accountFunction, postTransfer } from "./transfer.service.js";
import { transferSchema } from "./transfer.validator.js";



export const  transfer = async (req, res) => {

    try {
        
        const user = req.user;

        const  { error, value} = transferSchema.validate(req.body)

        if  (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const { senderAccountNum, receiverAccountNum, amount} = value;

        const [acct] = await accountFunction(senderAccountNum);
        // console.log(acct);
        // console.log(acct.userid, user.id)

        if (acct.userid !== user.id){
            return res.status(403).json({ message: "You are not the owner of this account"})
        }

        if (senderAccountNum === receiverAccountNum) {
            return res.status(400).json({ message: "Cannot transfer to the same account." });
        }
        

        const senderAcc = await makeTransfer(senderAccountNum, receiverAccountNum, amount);

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



