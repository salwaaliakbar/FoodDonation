const Campaign = require("../Models/campaignModel");

async function CampaignsFeed(req, res) {
  try {
    // Find campaigns based on status

    const { userId, status } = req.query;

    // Validate the status (active, granted, blacklisted)
    if (!["Active", "Awarded", "Expired"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const campaigns = await Campaign.find({ status: status }, { awarded: 0 })
      .populate("createdBy", "fullname") // Populate createdBy with user's fullname
      .populate({
        path: "applied.p_id", // Populate the user inside applied array
        select: "fullname", // Only fetch fullname from users
      })
      .exec();

    console.log("campaigns", campaigns);

    res.status(200).json({
      message: "Fetch Campaigns sucsessfully",
      success: true,
      campaigns,
    });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = CampaignsFeed;
