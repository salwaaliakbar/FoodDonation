const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel = require('../Models/userModel');

const ACCESS_SECRET = process.env.JWT_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

const refreshTokenController = async (req, res) => {
  console.log('refresh token called')
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing', code: 'TOKEN_MISSING' });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found', code: 'USER_MISSING' });
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email
      },
      ACCESS_SECRET,
      { expiresIn: '1h' }
    );

    // Set new access token cookie
    res.cookie('authToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      path: "/",
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    return res.status(200).json({ success: true, message: 'Access token refreshed' });

  } catch (err) {
    console.error('Refresh token error:', err);
    return res.status(401).json({ message: 'Invalid or expired refresh token', code: 'INVALID_REFRESH' });
  }
};

module.exports = refreshTokenController;
