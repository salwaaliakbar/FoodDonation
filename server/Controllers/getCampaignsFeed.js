const { ACTIVE } = require("../utils/constantVariables");
const Campaign = require("../Models/campaignModel");

async function CampaignsFeed(req, res) {
  try {
    // Find campaigns based on status

    const { status, location } = req.query;
    const now = new Date();
    const query = {
      status,
      expiration: { $gt: now }, // Only include non-expired campaigns
    };

    if (location) {
      query.location = { $regex: new RegExp(location, "i") }; // case-insensitive search
    }

    // Validate the status (active, granted, blacklisted)
    if (!["Active", "Awarded", "Expired"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    if (status === ACTIVE) {
      console.log("inside active campaign", status);
      const campaigns = await Campaign.find(query)
        .populate("createdBy", "fullname") // Populate createdBy with user's fullname
        .populate({
          path: "applied.p_id", // Populate the user inside applied array
          select: "fullname _id", // Only fetch fullname and id  from users
        })
        .sort({ createdAt: -1 })
        .exec();

      console.log("campaigns", campaigns);

      res.status(200).json({
        message: "Fetch Campaigns sucsessfully",
        success: true,
        campaigns,
      });
    } else {
      const campaigns = await Campaign.find({
        status: status,
      })
        .populate("createdBy", "fullname") // Populate createdBy with user's fullname
        .populate({
          path: "applied.p_id", // Populate the user inside applied array
          select: "fullname _id", // Only fetch fullname and id  from users
        })
        .sort({ createdAt: -1 })
        .exec();

      console.log("campaigns", campaigns);

      res.status(200).json({
        message: "Fetch Campaigns sucsessfully",
        success: true,
        campaigns,
      });
    }
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = CampaignsFeed;
