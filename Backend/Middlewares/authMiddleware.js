const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel = require('../Models/userModel');

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied",  code: "TOKEN_MISSING"  });
    }

    try {
        const isDecoded = jwt.verify(token, SECRET_KEY); // Verify the token
        if (!isDecoded) {
            return res.status(401).json({ message: "Invalid token", code: "INVALID_TOKEN" });
        }
        const userData = await userModel.findOne({ email: isDecoded.email });
        if (!userData) {
            return res.status(401).json({ message: "User not found", code: "USER_MISSING" });
        }
        req.user = userData; 
        next(); 
    } catch (err) {
        console.error("Error verifying token:", err);
        return res.status(401).json({ message: "Invalid or expired token", code: "TOKEN_EXPIRE" });
    }
}

module.exports = authMiddleware;
