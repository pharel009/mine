import { createAcoount, getAccountByNumber} from "./account.services.js";
import { createAcoountSchema } from "./account.validator.js";

//create account and get acct number controller
export const createAcountController = async (req, res) => {
    try {
        const user = req.user;


        if(!user) return res.status(401).json({
            message: 'You must be logged in to create an account'
        })

        const { error, value } = createAcoountSchema.validate(req.body)
        if(error) return res.status(400).json({
            message: error.details[0].message
        })

        console.log(user)

        const accNum = user.phonenumber.slice(1)

        const [accExists ]= await getAccountByNumber(accNum)

        console.log(accExists)

        if(accExists) return res.status(409).json({
            message:  'Account already exists!!!'

        })

        const [acct] = await createAcoount(user.id, accNum, value.currency, value.type);

        return res.status(201).json({
            message:   'Account created successfully',
            account: acct

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
};