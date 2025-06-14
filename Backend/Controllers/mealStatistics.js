const Recipient = require("../Models/recipentModel"); // Import Recipient model

async function mealStatistics(req, res) {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "Missing userId Invalid User" });
    }

    // Step 1: Find recipient's applied and awarded campaign IDs
    const recipient = await Recipient.findOne({ userId });

    if (
      !recipient ||
      !recipient.actions.applied.length ||
      !recipient.actions.awarded.length
    ) {
      return res.status(200).json({ success: true, campaigns: [] });
    }

    // // Step 2: Seperating Awarded campaign IDs into an Array
    // const awardedIds = recipient.actions.awarded.map((id) => id.toString());

    // if (awardedIds.length === 0) {
    //   return res.status(200).json({ success: true, campaigns: [] });
    // }

    // // Step 3: Fetch campaigns
    // const campaigns = await Campaign.find({
    //   _id: { $in: awardedIds },
    // })
    //   .populate("createdBy", "fullname")
    //   .populate({
    //     path: "applied.p_id",
    //     select: "fullname",
    //   });

    let statistics = {
      applied: recipient.actions.applied.length,
      awarded: recipient.actions.awarded.length,
    };

    res.status(200).json({ success: true, statistics });
  } catch (error) {
    console.error("grantedFeed error:", error);
    res.status(500).json({ success: false, error: "Server side error" });
  }
}

module.exports = mealStatistics;
