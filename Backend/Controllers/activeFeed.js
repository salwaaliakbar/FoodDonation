// // controllers/activeFeed.js
const Recipient = require("../Models/recipentModel");
const Campaign = require("../Models/campaignModel");

async function activeFeed(req, res) {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ success: false, error: "Missing userId" });
    }

    // Step 1: Find recipient's applied and awarded campaign IDs
    const recipient = await Recipient.findOne({ userId });

    if (!recipient || !recipient.actions.applied.length) {
      return res.status(200).json({ success: true, campaigns: [] });
    }

    // Step 2: Filter applied campaigns that are NOT in awarded
    const appliedIds = recipient.actions.applied.map((id) => id.toString());
    const awardedIds = recipient.actions.awarded.map((id) => id.toString());

    const filteredApplied = appliedIds.filter((id) => !awardedIds.includes(id));

    if (filteredApplied.length === 0) {
      return res.status(200).json({ success: true, campaigns: [] });
    }

    // Step 3: Fetch campaigns by filtered applied IDs
    const campaigns = await Campaign.find({
      _id: { $in: filteredApplied },
    })
      .populate("createdBy", "fullname")
      .populate({
        path: "applied.p_id",
        select: "fullname",
      });

    res.status(200).json({ success: true, campaigns });
  } catch (error) {
    console.error("activeFeed error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
}

module.exports = activeFeed;
