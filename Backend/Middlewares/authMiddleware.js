const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel = require('../Models/userModel');

const SECRET_KEY = process.env.JWT_SECRET || 'FoodDonationUsers';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({ message:"No token, authorization denied" });
    }

    const jwtToken = token.replace('Bearer',"").trim();

    try{
        const isDecoded = jwt.verify(jwtToken,SECRET_KEY);
        const userData = userModel.find({ email: isDecoded.email });
        req.user = userData;
        next();
    } catch(err){
        res.status(401).json({ message:"Invalid Token "})
    }
}

module.exports = authMiddleware;
