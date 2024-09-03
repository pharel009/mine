import express from "express"
import { users } from "./users.js"
import fs from "fs";

const app = express()

const port = 4000;

app.use(express.json());

// const hostname = '192.168.0.130';

//middleware for checking valid id
const logger = (req, res, next) => {
    const id = parseInt(req.params.id);

    if (id < 1) {
        return res.status(400).json({message: "Id is not valid"})      
    }
    next();
}

//middleware to validate username 
const validateUsername = (req, res, next) => {
    const username = req.body.username;

    const userNameExist = users.find((user) => user.username === username);

    if (userNameExist) {
        return res.status(409).json({message: "User with this username already exist"});
    }
    next();
};

//middleware to validate email
const validateEmail = (req, res, next) => {
    const email = req.body.email;

    const emailExist = users.find((user) => user.email === email);

    if (emailExist) {
        return res.status(409).json({message: "User with this email already exist"});
    };
    next();
};

//middleware to validate password
const validatePassword = (req, res, next) => {

    // Extract password from the requet body

    const password = req.body.password;

    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!passwordValid.test(password)) {
        return res.status(400).json({
            message: "Password mucst be 8 character long, must contain at least one uppercase letter, one lowercase letter and one special character"})
    }
    next()
}

// get all users
app.get('/get-users', (req,res) => {
    return res.json({
        message: 'These are all the users',
        data: users,
    });
});

//get single user with id
app.get('/get-users/:id', logger, (req, res) => {

    const { id } = req.params;
    const user = users.find((user) => user.id === parseInt(id));

    return res.json({
        message: 'This is a user',
        data: user,
    })
})

//post new user
app.post('/sign-up', validateUsername, validateEmail, validatePassword, (req, res) => {

    const { username, email, password } = req.body;
    const id = users.length + 1;

    const newUser = {
        id,
        username,
        email,
        password
    }
    users.push(newUser)

    const stringUsers = JSON.stringify(users, null, 2);

    fs.writeFileSync("C:/Users/Pharel/Documents/backendclass/src/users.js", `export let users = ${stringUsers}`);

    return res.status(201).json({
        message: 'User has been created',
        data: newUser
        //data: JSON.parse(stringUsers)
    });
    
});

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})