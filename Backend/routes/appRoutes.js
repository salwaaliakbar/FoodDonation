const router = require("express").Router();
const login = require('../Controllers/loginController')
const signup = require('../Controllers/signupController')
const campaign = require('../Controllers/campaignController')
const updateProfile = require('../Controllers/updateProfileController')
const authMiddleware = require('../Middlewares/authMiddleware')

router.post('/login',login)
router.post('/signup',signup)
router.post('/campaign', campaign)
router.put('/updateProfile',authMiddleware, updateProfile)

module.exports = router