const Campaign = require("../Models/campaignModel");
const Recipient = require("../Models/recipentModel"); // Import Recipient model

async function awardCampaign(req, res) {
  try {
    const { campaignId, userId, awardedPersons } = req.body;

    if (!campaignId || !userId || !awardedPersons) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    // Create the sub-object to push into the campaign
    const awardedEntry = {
      p_id: userId,
      a_date: new Date(),
      a_persons: awardedPersons,
    };

    // Update the Campaign model (push into applied array)
    const result = await Campaign.findByIdAndUpdate(
      campaignId,
      { $push: { awarded: awardedEntry } },
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
      { $addToSet: { "actions.awarded": campaignId } }, // $addToSet avoids duplicates
      { upsert: true, new: true } // Create if not exists
    );

    res.status(200).json({ success: true, campaign: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
}

module.exports = awardCampaign;
