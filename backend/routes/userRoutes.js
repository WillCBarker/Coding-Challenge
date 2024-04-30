const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verify-token");

const router = express.Router();

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

router.use(verifyToken);

router.get("/", userController.getUsers);

module.exports = router;