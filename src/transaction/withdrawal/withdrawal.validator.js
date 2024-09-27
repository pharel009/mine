import Joi from "joi";


//withdrawal schema
export const withdrawalSchema = Joi.object({

    accountNumber: Joi.string()
        .required(),

    amount: Joi.number()
        .min(0)
        .required()

});