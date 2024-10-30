import { transporter } from "../config/nodemailer.js";
import { config } from "../config/env.js";
import { generateVerificationToken } from "./jwt.js";

export const sendForgotPasswordMail = async (user) => {

    const token = generateVerificationToken(user.id)

    const resetUrl = `http://localhost:4000/users/reset-password?token=${token}`;
    
    const passwordOptions = {
        from: {
            name: 'Pharel Web',
            address: config.mailer.email
        },
        to: user.email,
        subject: 'Password Reset',
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password</p>`
        
    }
    try {
        await transporter.sendMail(passwordOptions)
        console.log('Reset link sent');
    } catch (error) {
        console.log(error);
    }
    
    console.log('User email:', user.email);

};

