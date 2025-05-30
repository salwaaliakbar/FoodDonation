function logout(req,res){
    res.clearCookie('authToken', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: process.env.NODE_ENV === 'production',
        path: "/",
      });
      res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: process.env.NODE_ENV === 'production',
        path: "/api/refresh",
      });
      res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = logout