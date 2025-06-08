const cron = require("node-cron");
const messageSchema = require("../Models/messageModel");

function messageCron() {
  cron.schedule("0 0 * * *", async () => {
    try {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      await Message.deleteMany({ createdAt: { $lt: sevenDaysAgo } });
    } catch (err) {
      console.error("[CRON] Error deleting messeges:", err);
    }
  });
}

module.exports = messageCron;
