const Campaign = require("../Models/campaignModel");

async function getHistory(req, res) {
  try {
    const { userId, status } = req.query;
    if (!userId || !status) {
      return res.status(400).json({ error: "userId and status are required" });
    }
    
    for (const key in req.body) {
      if (req.body[key] === null || req.body[key] === undefined) {
        return res.status(400).json({ error: `Field '${key}' in body cannot be null or undefined` });
      }
    }

    // Validate the status (active, granted, blacklisted)
    if (!["Active", "Awarded", "Expired"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Find campaigns based on userId and status
    const campaigns = await Campaign.find({ createdBy: userId, status: status })
      .populate("createdBy", "fullname") // Populate createdBy with user's fullname
      .populate({
        path: "applied.p_id", // Populate the user inside applied array
        select: "fullname", // Only fetch fullname from users
      })
      .sort({ createdAt: -1 })
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

module.exports = getHistory;
