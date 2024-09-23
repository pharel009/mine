import Joi from "joi";



export const transferSchema = Joi.object({

    sourceId: Joi.string().uuid().required(),
    destinationId: Joi.string().uuid().required(),
    amount:  Joi.number().min(0).required()
    
})