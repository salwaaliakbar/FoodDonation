function logout(req,res){
    res.clearCookie('authToken', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: false
      });
      res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: false
      });
      res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = logout