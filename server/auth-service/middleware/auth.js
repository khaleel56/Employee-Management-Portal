const JWT = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const User = require('../models/UserModel');
const sharedController = require('../controllers/sharedController')

const TOKEN_PRIVATE_KEY = process.env.TOKEN_PRIVATE_KEY;
const TOKEN_EXPIRATION_TIME = +process.env.TOKEN_EXPIRATION_TIME;

const authorization = async (req, res, next) => {

    let decodedToken;
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: "Missing authorization header" });
        }

        const token = authHeader.replace(/^Bearer\s+/, "");

        decodedToken = sharedController.verifyToken(token)
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token format" });
        } else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expired" });
        } else {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    if (!decodedToken || !decodedToken.userId) {
        return res.status(401).json({ error: "Invalid token content" });
    }

    req.body.userId = decodedToken.userId;

    const user = await User.findById(req.body.userId);
    if (!user) {
        return res.status(401).json({ error: "User not found" });
    }
    if (!user.active) {
        return res.status(401).json({ error: "Access denied: User inactive" });
    }

    const refreshToken = sharedController.generateToken(decodedToken.userId)
    req.body.token = refreshToken;
    next();
}
module.exports = authorization;
