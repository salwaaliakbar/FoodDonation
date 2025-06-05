const router = require("express").Router();
const authController = require('../Controllers/authController')
const authMiddleware = require('../Middlewares/authMiddleware')

router.post('/api/login', authController.login);
router.post('/api/signup', authController.signup);
router.get('/api/logout', authController.logout)
router.post('/api/me', authMiddleware, authController.verifyuser)
router.post('/api/refresh', authController.refreshToken)
router.post('/api/forgotPassword', authController.forgotPassword)
router.get('/api/resetPassword/:id/:token',authController.resetPassword )
router.put('/api/resetPassword/:id/:token', authController.updatePassword)

module.exports = router;
