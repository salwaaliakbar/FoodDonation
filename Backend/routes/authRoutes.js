const router = require("express").Router();
const login = require('../Controllers/loginController');
const signup = require('../Controllers/signupController');
const logout = require('../Controllers/logoutController')
const me = require('../Controllers/meController')
const authMiddleware = require('../Middlewares/authMiddleware')
const refreshToken = require('../Controllers/refreshTokenController')
const forgetPassword = require('../Controllers/forgotPasswordController')
const resetPassword = require('../Controllers/resetPassword')
const updatePassword = require('../Controllers/updatePasswordController')

router.post('/api/login', login);
router.post('/api/signup', signup);
router.post('/api/logout', logout)
router.post('/api/me', authMiddleware, me)
router.post('/api/refresh', refreshToken)
router.post('/api/forgotPassword', forgetPassword)
router.get('/api/resetPassword/:id/:token', resetPassword)
router.post('/api/resetPassword/:id/:token', updatePassword)

module.exports = router;
