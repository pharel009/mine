import Joi from "joi";


//transfer schema
export const transferSchema = Joi.object({

    senderAccountNum: Joi.string()
        .required(),

    receiverAccountNum: 
        Joi.string()
        .required(),

    amount:  
        Joi.number()
        .min(0)
        .required()
    
})