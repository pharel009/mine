import { config } from "../config/env.js";
import jwt from "jsonwebtoken";


//middleware to verify user token
export const verifyUser = (req, res, next) => {

    const authHeader = req.headers['authorization']

    if (!authHeader) return res.status(401).json({
        message: "Authorization header missing!"
    })

    const token = authHeader.split(' ')[1]

    if (!token) return res.status(401).json({
        message: "No token"
    })


    jwt.verify(token, config.auth.accessTokenSecretKey, (err, decoded) => {
        if (err) return res.status(403).json({
            message: "Token expired!!!"
        })

        //console.log(decoded)

        req.user = decoded.user;

        next();
        
    })
    

};

