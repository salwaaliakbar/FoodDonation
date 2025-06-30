const router = require("express").Router();
const authController = require('../Controllers/authController')
const authMiddleware = require('../Middlewares/authMiddleware')

router.post('/api/login', authController.login);
router.post('/api/signup', authController.signup);
router.get('/api/logout', authController.logout)
router.get('/api/me', authMiddleware, authController.verifyuser)
router.get('/api/refresh', authController.refreshToken)
router.post('/api/forgotPassword', authController.forgotPassword)
router.put('/api/resetPassword/:id/:token', authController.resetPassword)

module.exports = router;
