import { makeWithdrawal, postWithdrawal } from "./withdrawal.service.js";
import { withdrawalSchema } from "./withdrawal.validator.js";
import { accountFunction } from "../transfer/transfer.service.js";


export const withdrawal = async (req, res) => {

    try {
        
        const user = req.user;

        const { error, value } = withdrawalSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const { accountNumber, amount } = value;

        const acct = await accountFunction(accountNumber);

        if (acct.userid !== user.userid) {
            return res.status(403).json({ message: "You are not the owner of this account"})
        }

         await makeWithdrawal(accountNumber, amount)

        const [withdrawal] = await postWithdrawal(accountNumber, amount);


        return res.status(200).json({
            message: 'Withdrawal successful',
            withdrawal
        })
    } catch (error) {

        console.error(error)
        return res.status(500).json({ message: `Internal server Error, ${error}`})
        
    }
};