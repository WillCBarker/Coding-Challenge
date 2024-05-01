const { v4: uuidv4 } = require("uuid");
const db = require("../db");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
 
const createUser = async (email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create(email, hashedPassword);
        return newUser.rows[0];
    } catch (error) {
        throw error;
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        return users.rows;
    } catch (error) {
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.find(email);
        return user.rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail
};
