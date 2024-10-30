import { makeWithdrawal, postWithdrawal } from "./withdrawal.service.js";
import { withdrawalSchema } from "./withdrawal.validator.js";
import { accountNumberFunction } from "../transfer/transfer.service.js";


export const withdrawal = async (req, res) => {

    try {
        
        const user = req.user;

        const { error, value } = withdrawalSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const { accountNumber, amount } = value;

        const withdrawAccount = await accountNumberFunction(accountNumber)

        if (withdrawAccount.length <= 0) {
            return res.status(404).json({ message: `Invalid account`})
        };

        if (parseFloat(withdrawAccount[0].balance) < amount){
            return res.status(403).json({ message:'Insufficient fund!!!'})
        }

        const [acct] = await accountNumberFunction(accountNumber);
        // console.log(acct);
        // console.log(acct.userid, user.id);

        if (acct.userid !== user.id) {
            return res.status(403).json({ message: "You are not the owner of this account"})
        }

        if(amount < 0) {
            return res.status(400).json({ message: 'Amount cannot be a negative number'})
        }

         await makeWithdrawal(accountNumber, amount)

        const withdrawal = await postWithdrawal(accountNumber, amount);


        return res.status(200).json({
            message: 'Withdrawal successful',
            withdrawal
        })
    } catch (error) {

        console.error(error)
        return res.status(500).json({ message: `Internal server Error, ${error}`})
        
    }
};