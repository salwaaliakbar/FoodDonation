const router = require("express").Router();
const createCampaign = require("../Controllers/campaignController");
const updateProfile = require("../Controllers/updateProfileController");
const authMiddleware = require("../Middlewares/authMiddleware");
const getHistory = require("../Controllers/getCampaignHistoryController");
const awardCampaign = require("../Controllers/awardCampaign");

router.post("/api/createCampaign", authMiddleware, createCampaign);
router.put("/api/updateProfile", authMiddleware, updateProfile);
router.get("/api/getHistoy", authMiddleware, getHistory);

module.exports = router;
