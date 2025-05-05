const Campaign = require("../Models/campaignModel");
const Recipient = require("../Models/recipentModel"); // Import Recipient model

async function applyCampaign(req, res) {
  try {
    const { campaignId, userId, appliedPersons } = req.body;

    if (!campaignId || !userId || !appliedPersons) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    // Create the sub-object to push into the campaign
    const appliedEntry = {
      p_id: userId,
      date: new Date(),
      persons: appliedPersons,
    };

    // Update the Campaign model (push into applied array)
    const result = await Campaign.findByIdAndUpdate(
      campaignId,
      { $push: { applied: appliedEntry } },
      { new: true }
    );

    if (!result) {
      return res
        .status(404)
        .json({ success: false, error: "Campaign not found" });
    }

    // Update the Recipient model (push campaignId into actions.applied)
    await Recipient.findOneAndUpdate(
      { userId },
      { $addToSet: { "actions.applied": campaignId } }, // $addToSet avoids duplicates
      { upsert: true, new: true } // Create if not exists
    );

    res.status(200).json({ success: true, campaign: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
}

module.exports = applyCampaign;
