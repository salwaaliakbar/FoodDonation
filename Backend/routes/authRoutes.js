const router = require("express").Router();
const login = require('../Controllers/loginController');
const signup = require('../Controllers/signupController');
const logout = require('../Controllers/logoutController')

router.post('/api/login', login);
router.post('/api/signup', signup);
router.post('/api/logout', logout)

module.exports = router;
