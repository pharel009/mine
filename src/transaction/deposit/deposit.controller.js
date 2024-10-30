import { makeDeposit, postDeposit } from "./deposit.service.js";
import { depositSchema } from "./deposit.validator.js";
import { accountNumberFunction } from "../transfer/transfer.service.js";
import { getUserById } from "../../user/user.service.js";

 export const deposit = async (req, res) => {

    try {
        
        const user = req.user;

        const { error, value } = depositSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        const { depositorId, receiverAccountNum, amount } = value;

        const depositor = await getUserById(depositorId)
        if (depositor.length <= 0) {
            return res.status(403).json({ message: `You are not a valid sender`})
        }


        const [acc] = await accountNumberFunction(receiverAccountNum);

        if (!acc) return res.status(403).json({
            message:  "Invalid account"
        })

        if(amount < 0) {
            return res.status(400).json({ message: 'Amount cannot be a negative number'})
        }

         await makeDeposit(depositorId, receiverAccountNum, amount);

        const depositAmount = await postDeposit(depositorId, receiverAccountNum, amount);


        return res.status(200).json({
            message: "Deposit successful",
            depositAmount
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: `Internal Server Error, ${error}` })
    }
};