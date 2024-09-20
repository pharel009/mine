import Joi from "joi";

export const createAcoountSchema = Joi.object({

    currency: Joi.string()
        .valid("NGN", "USD")
        .required(),
        
    type: Joi.string()
        .valid("savings", "current")
        .required()
})