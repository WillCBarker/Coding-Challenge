const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error("Authentication failed.")
        }
        const decodedToken = jwt.verify(token, "some_secret_token");
        req.userData = {userId: decodedToken.userId};
        next();
    } catch (error) {
        res.status(401).json( { message: "Authentication failed." })
        return next(error);
    }
}