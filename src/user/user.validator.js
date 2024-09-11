import Joi from "joi";


export const signupSchema = Joi.object({

    first_name: Joi.string()
        .min(3)
        .required(),

    last_name: Joi.string()
        .min(3)
        .optional(),

    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\\W_]).{8,}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must contain atleast one uppercase letter, one lowercase letter, a number, one special character and 8 character long.',
            'any.required': 'Password is required'
        })

})
