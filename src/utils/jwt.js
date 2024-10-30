import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import crypto from 'crypto';

export const generateToken = (userdetails) => {

    const token = jwt.sign({user:userdetails}, config.auth.accessTokenSecretKey, {expiresIn: config.auth.accessTokenExpire})

    return token
};


export const generateVerificationToken = () => {
    return crypto.randomBytes(64).toString('hex')
};