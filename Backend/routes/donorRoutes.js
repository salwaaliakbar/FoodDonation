const router = require("express").Router();
const authMiddleware = require("../Middlewares/authMiddleware");
const donorController = require("../Controllers/donorController");
const { recipientLimiter } = require("../Middlewares/rateLimiterMiddleware");

router.post(
  "/api/createCampaign",
  authMiddleware,
  donorController.createCampaign
);
router.put("/api/updateProfile", authMiddleware, donorController.updateProfile);
router.get("/api/getHistoy", authMiddleware, donorController.getHistory);
router.get(
  "/api/getUserData/:id",
  authMiddleware,
  recipientLimiter,
  donorController.getUserData
);
router.put(
  "/api/updateStatus/:id/:p_id/:p_name",
  authMiddleware,
  donorController.updateStatus
);
router.get("/api/statSummary/:id", donorController.statsSummary);

module.exports = router;
