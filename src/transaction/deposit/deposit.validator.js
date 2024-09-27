import Joi from "joi";


//deposit schema
export const depositSchema = Joi.object({

    senderId: Joi.string()
        .uuid()
        .required(),

    receiverAccountNum: Joi.string()        
        .required(),

    amount:  Joi.number()
        .min(0)
        .required()

});