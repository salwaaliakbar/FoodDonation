const router = require("express").Router();
const CampaignsFeed = require("../Controllers/getCampaignsFeed");
const authMiddleware = require("../Middlewares/authMiddleware");
const applyCampaign = require("../Controllers/applyCampaign");
const activeFeed = require("../Controllers/activeFeed");
const { feedLimiter } = require("../Middlewares/rateLimiterMiddleware");
const grantedMeals = require("../Controllers/grantedMeals");
const mealStatistics = require("../Controllers/mealStatistics");

router.get("/api/generalFeed", authMiddleware, feedLimiter, CampaignsFeed);
router.post("/api/applyCampaign", authMiddleware, applyCampaign);
router.get("/api/activeFeed", authMiddleware, activeFeed);
router.get("/api/grantedMeals", authMiddleware, grantedMeals);
router.get("/api/mealStatistics", authMiddleware, mealStatistics);

module.exports = router;
