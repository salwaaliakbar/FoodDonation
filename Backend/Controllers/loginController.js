const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_SECRET_KEY = process.env.JWT_SECRET;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET;

async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "All fields are required", success: false });
  }

  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Username not Found in our Database", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Invalid Password", success: false });
    }

    // Generate New access Token
    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      ACCESS_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    //Generate New Refresh TOken
    const refreshToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      REFRESH_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("authToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/api/refresh",
      // maxAge: 1 * 60 * 1000 // 1 min

      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    console.log(user);
    const { password: _, ...userData } = user._doc;

    res
      .status(200)
      .json({ message: "Login successful", success: true, userData });
  } catch (err) {
    res.status(500).json({ error: "Server error ", err, success: false });
  }
}

module.exports = login;
