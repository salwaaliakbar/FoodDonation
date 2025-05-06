const router = require("express").Router();
const login = require('../Controllers/loginController');
const signup = require('../Controllers/signupController');
const logout = require('../Controllers/logoutController')
const refresh = require('../Controllers/refreshController')
const authMiddleware = require('../Middlewares/authMiddleware')

router.post('/api/login', login);
router.post('/api/signup', signup);
router.post('/api/logout', logout)
router.post('/api/refresh', authMiddleware, refresh)

module.exports = router;
