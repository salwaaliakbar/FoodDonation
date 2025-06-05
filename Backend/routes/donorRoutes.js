const router = require("express").Router();
const authMiddleware = require("../Middlewares/authMiddleware");
const donorController = require('../Controllers/donorController')

router.post("/api/createCampaign", authMiddleware, donorController.createCampaign);
router.put("/api/updateProfile", authMiddleware, donorController.updateProfile);
router.get("/api/getHistoy", authMiddleware, donorController.getHistory);
router.get("/api/getUserData/:id", authMiddleware, donorController.getUserData)
router.put("/api/updateStatus/:id/:name", authMiddleware, donorController.updateStatus)

module.exports = router;
