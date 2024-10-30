import Joi from "joi";


//deposit schema
export const depositSchema = Joi.object({

    depositorId: Joi.string()
        .uuid()
        .required(),

    receiverAccountNum: Joi.string()
        .min(10)       
        .required(),

    amount: Joi.number()
        .min(0)
        .required()

});