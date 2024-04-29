const { v4: uuidv4 } = require('uuid');
const { validationResult } = require("express-validator");

const DUMMY = [{}]

const getUsers = (req, res, next) => {
    res.json({ DUMMY })
};

const signup = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(422).json({ message: "Invalid input." })
    }

    const { username, password} = req.body;

    const hasUser = DUMMY.find(u => u.username === username);
    if (hasUser) {
        res.status(401).json({ message: "Could not create user. Username already exists." })
    }

    const createdUser = {
        id: uuidv4(),
        username,
        password
    };

    DUMMY.push(createdUser);

    res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(422).json({ message: "Invalid input." })
    }
    
    const { username, password } = req.body;

    const identifiedUser = DUMMY.find(u => u.username === username);
    if (!identifiedUser || identifiedUser.password !== password) {
        return res.status(401).json({ message: "Could not identify user" })
    }
    res.status(200).json({ message: "Logged in!" })
};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;