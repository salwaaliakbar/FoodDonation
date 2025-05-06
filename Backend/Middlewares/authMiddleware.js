const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel = require('../Models/userModel');

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    console.log('inside middleware')
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const isDecoded = jwt.verify(token, SECRET_KEY); // Verify the token
        if (!isDecoded) {
            return res.status(401).json({ message: "Invalid token" });
        }
        console.log(isDecoded)
        const userData = await userModel.findOne({ email: isDecoded.email });
        if (!userData) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = userData; 
        console.log(req.user)
        next(); 
    } catch (err) {
        console.error("Error verifying token:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = authMiddleware;
