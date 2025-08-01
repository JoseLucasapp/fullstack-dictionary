require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.SECRET;

const jwtConfig = {
    expiresIn: "30d",
    algorithm: "HS256",
};

const generateToken = (payload) => {
    return jwt.sign(payload, jwtSecret, jwtConfig);
};

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecret);
};

module.exports = { generateToken, verifyToken };
