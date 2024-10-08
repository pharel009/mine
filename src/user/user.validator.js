import Joi from "joi";


//sign up schema
export const signupSchema = Joi.object({

    firstName: Joi.string()
        .min(3)
        .required(),

    lastName: Joi.string()
        .min(3)
        .optional(),

    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .lowercase(),
    
    phoneNumber: Joi.string()
        .required()
        .length(11)
        .pattern(new RegExp('^(?=.*[0-9])')),

    password: Joi.string()
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\\W_]).{8,}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must contain atleast one uppercase letter, one lowercase letter, a number, one special character and 8 character long.',
            'any.required': 'Password is required'
        })

});


//login schema
export const loginSchema = Joi.object({

    email: Joi.string()
        .email()
        .lowercase()
        .required(),

    password: Joi.string()
        .required()

});
