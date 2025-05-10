const router = require("express").Router();
const login = require('../Controllers/loginController');
const signup = require('../Controllers/signupController');
const logout = require('../Controllers/logoutController')
const me = require('../Controllers/meController')
const authMiddleware = require('../Middlewares/authMiddleware')
const refreshToken = require('../Controllers/refreshTokenController')

router.post('/api/login', login);
router.post('/api/signup', signup);
router.post('/api/logout', logout)
router.post('/api/me', authMiddleware, me)
router.post('/api/refresh', refreshToken)

module.exports = router;
