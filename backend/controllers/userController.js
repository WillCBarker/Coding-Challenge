const { validationResult } = require("express-validator");
const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users." });
    }
};

const signup = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).json({ message: "Invalid input." });
    }

    const { username, password } = req.body;

    try {
        const existingUser = await userService.getUserByUsername(username);
        if (existingUser) {
            return res.status(401).json({ message: "Could not create user. Username already exists." });
        }

        const createdUser = await userService.createUser(username, password);
        let token;
        token = jwt.sign(
            { userId: createdUser.id },
            "some_secret_token", 
            { expiresIn: "1h" }
            )
        return res.status(201).json({ userId: createdUser.id, token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to create user, try again." });
    }
};

const login = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).json({ message: "Invalid input." });
    }

    const { username, password } = req.body;

    try {
        const identifiedUser = await userService.getUserByUsername(username);
        if (!identifiedUser) {
            return res.status(401).json({ message: "Login failed, could not identify user." });
        }

        const isValidPassword = await bcrypt.compare(password, identifiedUser.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }
        let token;
        token = jwt.sign(
            { userId: identifiedUser.id },
            "some_secret_token", 
            { expiresIn: "1h" }
            )
        res.status(200).json({ userId: identifiedUser.id, token: token, message: "Logged in!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Login failed, please try again." });
    }
};

module.exports = {
    getUsers,
    signup,
    login
};
