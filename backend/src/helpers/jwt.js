require("dotenv").config();
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.SECRET;

const jwtConfig = {
    expiresIn: "30d",
    algorithm: 'HS256'
}

const generateToken = (auth) => {
    return jwt.sign(auth, jwtSecret, jwtConfig)
}

const verifyToken = (authorization) => {
    try {
        const token = authorization.split(' ')[1]
        return jwt.verify(token, jwtSecret)
    } catch (error) {
        throw error
    }
}

module.exports = { generateToken, verifyToken }