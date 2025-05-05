const router = require("express").Router();
const CampaignsFeed = require("../Controllers/getCampaignsFeed");
const authMiddleware = require("../Middlewares/authMiddleware");
const applyCampaign = require("../Controllers/applyCampaign");
const activeFeed = require("../Controllers/activeFeed");

router.get("/api/generalFeed", authMiddleware, CampaignsFeed);
router.post("/api/applyCampaign", authMiddleware, applyCampaign);
router.get("/api/activeFeed", authMiddleware, activeFeed);

module.exports = router;
