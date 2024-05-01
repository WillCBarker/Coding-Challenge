const { validationResult } = require("express-validator");
const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch users." });
    }
};

const getUserDetails = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).json({ message: "Invalid request, email missing." });
    }

    const { email } = req.body;
    try {
        const userDetails = await userService.getUserByEmail(email);
        return res.status(200).json({ userDetails: userDetails });
    } catch(error) {
        console.error(error);
        return res.status(404).json({ message: "Could not find user." })
    }
}

const signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            return res.status(401).json({ message: "Could not create user. Email already exists." });
        }

        const createdUser = await userService.createUser(email, password);
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
    const { email, password } = req.body;

    try {
        const identifiedUser = await userService.getUserByEmail(email);
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
        return res.status(200).json({ userId: identifiedUser.id, token: token, message: "Logged in!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Login failed, please try again." });
    }
};

module.exports = {
    getUsers,
    getUserDetails,
    signup,
    login
};
