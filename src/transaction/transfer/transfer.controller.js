import { makeTransfer } from "./transfer.service.js";
import { transferSchema } from "./transfer.validator.js";
import { getAccount } from "../../account/account.services.js";




export const  transfer = async (req, res) => {

    try {
        
        const user = req.user;

        const  { error, value} = transferSchema.validate(req.body)

        if  (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const { sourceId, destinationId, amount} = value;

        const [acct] = await getAccount(sourceId);

        console.log(acct.userid, user.id)

        if (acct.userid !== user.id){
            return res.status(403).json({ message: "You are not the owner of this account you thief"})
        }

        const [senderAcc] = await makeTransfer(sourceId, destinationId, amount);
        

        return res.status(200).json({
            message: "transfer successful",
            senderAcc
        })


    } catch (error) {

        console.error(error)
        return res.status(500).json({ message: `Internal Server Error, ${error}` });
        
    }
}



