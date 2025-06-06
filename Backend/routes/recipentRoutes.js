const router = require("express").Router();
const CampaignsFeed = require("../Controllers/getCampaignsFeed");
const authMiddleware = require("../Middlewares/authMiddleware");
const applyCampaign = require("../Controllers/applyCampaign");
const activeFeed = require("../Controllers/activeFeed");
const { feedLimiter } = require("../Middlewares/rateLimiterMiddleware");

router.get("/api/generalFeed", authMiddleware, feedLimiter,  CampaignsFeed);
router.post("/api/applyCampaign", authMiddleware, applyCampaign);
router.get("/api/activeFeed", authMiddleware, activeFeed);

module.exports = router;
