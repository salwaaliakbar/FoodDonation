const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

async function forgotPassword(req, res) {
  const { email } = req.body; 

  try {
    const oldUser = await userModel.findOne({ email });
    if (!oldUser) {
      return res.status(400).json({
        error: "Email is not Registered in our Database",
        success: false,
      });
    }

    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign(
      {
        id: oldUser._id,
        email: oldUser.email,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );

    const link = `http://localhost:5173/ResetPassword/${oldUser._id}/${token}`;
    // Create transporter using nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Compose email options
    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: oldUser.email,
      subject: "Password Reset Link",
      html: `<p>Hi ${oldUser.fullname},</p>
             <p>You requested to reset your password.</p>
             <p>Click the link below to reset your password. This link will expire in 1 hour.</p>
             <a href="${link}">${link}</a>`,
    };

    //  Send mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Reset password link sent to your email.",
      success: true,
    });

  } catch (err) {
    console.error("Error in forgotPassword:", err);
    res.status(500).json({
      error: "Server error",
      err,
      success: false,
    });
  }
}

module.exports = forgotPassword;
