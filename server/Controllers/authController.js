const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const campaignModel = require("../Models/campaignModel");
const nodemailer = require("nodemailer");

const ACCESS_SECRET_KEY = process.env.JWT_SECRET;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET;

// login handler
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

    const { password: _, ...userData } = user._doc;

    res
      .status(200)
      .json({ message: "Login successful", success: true, userData });
  } catch (err) {
    res.status(500).json({ error: "Server error ", err, success: false });
  }
}

// sign up handler
async function signup(req, res) {
  const { fullname, email, phone, organization, role, username, password } =
    req.body;

  if (
    !fullname ||
    !email ||
    !phone ||
    !organization ||
    !role ||
    !username ||
    !password
  ) {
    return res
      .status(400)
      .json({ error: "All fields are required", success: false });
  }

  try {
    let user = await userModel.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ error: "Username Should be Unique!", success: false });
    }

    user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: "Email already exist in out database!", success: false });
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
    });
    console.log("new user", newuser);

    // Generate New access Token
    const accessToken = jwt.sign(
      {
        id: newuser._id,
        username: newuser.username,
        email: newuser.email,
      },
      ACCESS_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    //Generate New Refresh TOken
    const refreshToken = jwt.sign(
      {
        id: newuser._id,
        username: newuser.username,
        email: newuser.email,
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
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    const { password: _, ...userData } = newuser._doc;
    console.log(userData);

    res.status(200).json({
      message: "Newuser Registered Successfully!",
      success: true,
      userData,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error ", err, success: false });
  }
}

// logout handler
function logout(req, res) {
  res.clearCookie("authToken", {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
    path: "/api/refresh",
  });
  res.status(200).json({ message: "Logged out successfully!" });
}

// verify user handler
async function verifyuser(req, res) {
  try {
    const user = req.user;

    if (!user || !user._id) {
      return res
        .status(404)
        .json({ success: false, error: "User not found or invalid token!" });
    }

    const users = await userModel.findOne({ _id: user._id });

    const activeMeals = await campaignModel
      .find({ createdBy: user._id, status: "Active" })
      .populate("createdBy", "fullname")
      .populate({
        path: "applied.p_id", // Populate the user inside applied array
        select: "fullname", // Only fetch fullname from users
      })
      .sort({ createdAt: -1 })
      .exec();

    const grantedMeals = await campaignModel
      .find({ createdBy: user._id, status: "Awarded" })
      .populate("createdBy", "fullname")
      .populate({
        path: "applied.p_id", // Populate the user inside applied array
        select: "fullname", // Only fetch fullname from users
      })
      .sort({ createdAt: -1 })
      .exec();

    const blacklistMeals = await campaignModel
      .find({ createdBy: user._id, status: "Expired" })
      .populate("createdBy", "fullname")
      .populate({
        path: "applied.p_id", // Populate the user inside applied array
        select: "fullname", // Only fetch fullname from users
      })
      .sort({ createdAt: -1 })
      .exec();

    const { password: _, ...userDetails } = users._doc;

    res.status(200).json({
      message: "Data fetch successfully!",
      success: true,
      userDetails,
      activeMeals,
      grantedMeals,
      blacklistMeals,
    });
  } catch (err) {
    console.error("Error refreshing data:", err);
    res.status(500).json({ success: false, error: "Server error", err });
  }
}

// forget password handler
async function forgotPassword(req, res) {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ error: "Email field is required!", success: false });
  }

  try {
    const oldUser = await userModel.findOne({ email });
    if (!oldUser) {
      return res.status(400).json({
        error: "Email is not Registered in our Database!",
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
      from: `"Food Secure " <${process.env.EMAIL_USER}>`,
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
    res.status(500).json({ error: "Server error", err, success: false });
  }
}

// reset password handler
async function resetPassword(req, res) {
  const { id, token } = req.params;
  
  if (!id || !token) {
    return res.status(400).json({
      error: 'Invalid or missing reset link parameters',
      success: false,
    });
  }

  const { password, confrimPassword } = req.body;

  if (!password || !confrimPassword) {
    return res.status(400).json({
      error: "Password and confirm password are required",
      success: false,
    });
  }

  if (password !== confrimPassword) {
    return res.status(400).json({
      error: "Passwords do not match",
      success: false,
    });
  }

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found", success: false });
    }

    const secret = process.env.JWT_SECRET + user.password;
    const isDecoded = jwt.verify(token, secret);
    if (!isDecoded) {
      return res.status(400).json({
        error: "Link expired or invalid. Please request a new reset link.",
        success: false,
        code: "INVALID_TOKEN",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userModel.updateOne(
      { _id: id },
      { $set: { password: hashedPassword } }
    );

    res
      .status(200)
      .json({ message: "Password updated successfully!", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", success: false });
  }
}

// refresh token handler
async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ error: "Refresh token missing", code: "TOKEN_MISSING" });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ error: "User not found", code: "USER_MISSING" });
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      ACCESS_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Set new access token cookie
    res.cookie("authToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res
      .status(200)
      .json({ success: true, message: "Access token refreshed" });
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(401).json({
      error: "Invalid or expired refresh token",
      code: "INVALID_REFRESH",
    });
  }
}

module.exports = {
  login,
  signup,
  logout,
  verifyuser,
  forgotPassword,
  resetPassword,
  refreshToken,
};
