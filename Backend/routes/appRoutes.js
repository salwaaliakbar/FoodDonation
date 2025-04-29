const router = require("express").Router();
const login = require('../Controllers/loginController')
const signup = require('../Controllers/signupController')

router.post('/login',login)
router.post('/signup',signup)

module.exports = router