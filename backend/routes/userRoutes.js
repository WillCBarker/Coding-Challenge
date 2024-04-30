const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getUsers);

router.post(
    "/login",
    [
        check("username")
            .not()
            .isEmpty(),
        check("password")
            .isLength({ min: 8 })
    ],
    userController.login
);

router.post(
    "/signup", 
    [
        check("username")
            .not()
            .isEmpty(),
        check("password")
            .isLength({ min: 8 })
    ],
    userController.signup);

module.exports = router;