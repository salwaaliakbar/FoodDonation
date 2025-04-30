const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'FoodDonationUsers';

async function signup(req, res) {
  const { fullname, email, phone, organization, role, username, password } =
    req.body;

  try {
    const user = await userModel.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ error: "Username Should be Unique", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = await userModel.create({
      fullname,
      email,
      phone,
      organization,
      role,
      username,
      password: hashedPassword,
      confrimPassword: hashedPassword,
    });

    // Generate New Token for first time user
    const token = jwt.sign(
      {
        id: newuser._id,
        username: newuser.username,
        email: newuser.email,
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour expiration
    }).status(200).json({
        message: "Newuser Registered Successfully",
        success: true,
        user: newuser
      });
  } catch (err) {
    res.status(500).json({ error: "Server error ", err, success: false });
  }
}

module.exports = signup;
