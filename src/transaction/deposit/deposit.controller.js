import { makeDeposit, postDeposit } from "./deposit.service.js";
import { depositSchema } from "./deposit.validator.js";
import { accountFunction } from "../transfer/transfer.service.js";


 export const deposit = async (req, res) => {

    try {
        
        const user = req.user;

        const { error, value } = depositSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const { senderId, receiverAccountNum, amount } = value;

        const [acc] = await accountFunction(receiverAccountNum);

        if (!acc) return res.status(403).json({
            message:  "Account not found"
        })

         await makeDeposit(senderId, receiverAccountNum, amount);

        const depositAmount = await postDeposit(senderId, receiverAccountNum, amount);


        return res.status(200).json({
            message: "Deposit successful",
            depositAmount
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: `Internal Server Error, ${error}` })
    }
};