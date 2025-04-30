const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'FoodDonationUsers';

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Username not Found in our Database", success: false });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Password", success: false });
    }

    // Generate New Token
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email
        },
        SECRET_KEY,
        {
            expiresIn: "1h"
        }
    );

    res.cookie('authToken', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict', 
      maxAge: 3600000  // 1 hour expiration
  }).status(200).json({ message: "Login successful", success: true, user });

  } catch (err) {
    res.status(500).json({ error: "Server error ", err, success: false });
  }
}

module.exports = login;