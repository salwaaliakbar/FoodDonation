const cron = require("node-cron");
const campaignModel = require("../Models/campaignModel");

function startExpirationCron() {
  cron.schedule("*/10 * * * *", async () => {
    const now = new Date();
    try {
      const result = await campaignModel.updateMany(
        { expiration: { $lte: now }, status: "Active" },
        { $set: { status: "Expired" } }
      );

      console.log(`[CRON] ${result.modifiedCount} campaign(s) expired at ${now}`);
    } catch (err) {
      console.error("[CRON] Error updating expired campaigns:", err);
    }
  });
}

module.exports = startExpirationCron;
