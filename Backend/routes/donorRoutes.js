const router = require("express").Router();
const campaign = require('../Controllers/campaignController');
const updateProfile = require('../Controllers/updateProfileController');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/api/campaign',authMiddleware, campaign);
router.put('/api/updateProfile', authMiddleware, updateProfile);

module.exports = router;
