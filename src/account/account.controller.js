import { createAcoount, getAccountNumber } from "./account.service.js";
import { createAcoountSchema } from "./account.validator.js";

//create account and get acct number controller
export const createAcountController = async (req, res) => {


    try {

        const user = req.user;

        const { error, value } = createAcoountSchema.validate(req.body)
        if(error) return res.status(400).json({
            message: error.details[0].message
        })

        if(!user) return res.status(401).json({
            message: 'You must be logged in to create an account'
        })

      

        //console.log(user)
 

    //using your phone number to create account

        //const accNum = user.phonenumber.slice(1)
        // const [accExists] = await getAccountNumber(accNum);
        // if (accExists) return res.status(409).json({
        //     message: 'Account already exists!!!'
        // })

        //function to create 10 digit account number
     const generateAccountNumber = () => {
    
    const prefix = 252;

    const randomPart = Math.floor(1000000 + Math.random() * 9000000).toString();
    const accountNum = prefix + randomPart;
    return accountNum;

    };
    let accountNumber = generateAccountNumber();
        let existingAccounts = await getAccountNumber(accountNumber);
        // console.log(existingAccounts)        

        
        while(existingAccounts.length > 0){
            accountNumber = generateAccountNumber();
            existingAccounts = await getAccountNumber(accountNumber);
        }


        const [acct] = await createAcoount(user.id, accountNumber, value.currency, value.type);

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

