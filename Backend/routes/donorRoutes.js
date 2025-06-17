const router = require("express").Router();
const authMiddleware = require("../Middlewares/authMiddleware");
const donorController = require("../Controllers/donorController");
const { recipientLimiter } = require("../Middlewares/rateLimiterMiddleware");

// route for create a new campaign
router.post(
  "/api/createCampaign",
  authMiddleware,
  donorController.createCampaign
);

// route for update profile
router.put("/api/updateProfile", authMiddleware, donorController.updateProfile);

// route for get history
router.get("/api/getHistoy", authMiddleware, donorController.getHistory);
router.get(
  "/api/getUserData/:id",
  authMiddleware,
  recipientLimiter,
  donorController.getUserData
);

// route to update status of a campaign
router.put(
  "/api/updateStatus/:id/:p_id/:p_name",
  authMiddleware,
  donorController.updateStatus
);

// route for getting stats summary
router.get("/api/statSummary/:id", donorController.statsSummary);

// route for delete a campaign
router.delete("/api/deleteCampaign/:id", authMiddleware, donorController.deleteCampaign)

module.exports = router;
