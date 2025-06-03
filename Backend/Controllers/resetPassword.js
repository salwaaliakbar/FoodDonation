const userModel = require('../Models/userModel') 
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function resetPassword(req, res){
    const { id, token } = req.params;
    const { password } = req.body;
    
    if (!password) {
        return res.status(400).json({ message: "Password is required", success: false });
    }
    try{
        const oldUser = await userModel({ _id: id })
        if(!oldUser){
            res.status(400).json({ message: "User Not Found ", success: false})
        }

        const secret = process.env.JWT_SECRET + oldUser.password;
        const isDecoded = jwt.verify(token, secret)
         if (!isDecoded) {
            return res.status(401).json({ message: "Invalid token", code: "INVALID_TOKEN", success: false });
        }
        // redirect to the resetPassword Page where user can update its password
        res.redirect(`http://localhost:5173/ResetPassword/${id}/${token}`);

    } catch (err) {
    res.status(500).json({ error: "Server error ", err, success: false });
  }
}

module.exports = resetPassword