const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_SECRET_KEY = process.env.JWT_SECRET;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET;

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
    console.log("chk1");
    user = newuser;

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
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({
      message: "Newuser Registered Successfully",
      success: true,
      user: newuser,
    });
  } catch (err) {
    console.log("cathxh ere: ", err);
    res.status(500).json({ error: "Server error ", err, success: false });
  }
}

module.exports = signup;
