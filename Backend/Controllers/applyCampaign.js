const Campaign = require("../Models/campaignModel");
const Recipient = require("../Models/recipentModel");
const userModel = require("../Models/userModel"); // assuming this model exists

async function applyCampaign(req, res) {
  try {
    const { campaignId, userId, appliedPersons } = req.body;

    if (!campaignId || !userId || !appliedPersons) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    const now = new Date();

    // Fetch the campaign
    const campaign = await Campaign.findById(campaignId).populate("createdBy");
    if (!campaign) {
      return res
        .status(404)
        .json({ success: false, error: "Campaign not found" });
    }

    // Check for expiration
    if (new Date(campaign.expiration) <= now) {
      return res
        .status(400)
        .json({ success: false, error: "Campaign already expired" });
    }

    // Create the applied entry
    const appliedEntry = {
      p_id: userId,
      date: new Date(),
      persons: appliedPersons,
    };

    // Push and sort applied array
    campaign.applied.push(appliedEntry);
    campaign.applied.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Save and populate again
    const updatedCampaign = await campaign.save();
    await updatedCampaign.populate("createdBy");

    // Update Recipient model
    await Recipient.findOneAndUpdate(
      { userId },
      { $addToSet: { "actions.applied": campaignId } },
      { upsert: true, new: true }
    );

    // Fetch user's fullname
    const user = await userModel.findById(userId).select("fullname");

    // Emit real-time update
    const io = req.app.get("io");
    const donorId = updatedCampaign.createdBy?._id?.toString();

    if (io && donorId && user) {
      io.emit("meal_applied", {
        mealId: updatedCampaign._id,
        newApplicant: {
          p_id: { _id: userId, fullname: user.fullname },
          persons: appliedPersons,
          date: appliedEntry.date,
        },
      });

      io.to(donorId).emit("notifyDonor", {
        message: `${user.fullname} applied to your campaign`,
        campaignId,
        campaignTitle: updatedCampaign.title,
        recipientName: user.fullname,
        appliedPersons,
      });
    }

    res.status(200).json({ success: true, campaign: updatedCampaign });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
}

module.exports = applyCampaign;
