const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel = require('../Models/userModel');

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied",  code: "TOKEN_MISSING", success: false  });
    }

    try {
        const isDecoded = jwt.verify(token, SECRET_KEY); // Verify the token
        if (!isDecoded) {
            return res.status(401).json({ error: "Invalid token", code: "INVALID_TOKEN", success: false });
        }
        const userData = await userModel.findOne({ email: isDecoded.email });
        if (!userData) {
            return res.status(401).json({ error: "User not found", code: "USER_MISSING", success: false });
        }
        req.user = userData; 
        next(); 
    } catch (err) {
        console.error("Error verifying token:", err);
        return res.status(401).json({ error: "Invalid or expired token", code: "TOKEN_EXPIRE", success: false });
    }
}

module.exports = authMiddleware;
