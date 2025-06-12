const Campaign = require("../Models/campaignModel");
const Recipient = require("../Models/recipentModel");
const userModel = require("../Models/userModel"); // assuming this model exists

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
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { $push: { applied: appliedEntry } },
      { new: true }
    ).populate("createdBy"); // Populate to access donor's socket room

    if (!updatedCampaign) {
      return res
        .status(404)
        .json({ success: false, error: "Campaign not found" });
    }

    // Update the Recipient model (push campaignId into actions.applied)
    await Recipient.findOneAndUpdate(
      { userId },
      { $addToSet: { "actions.applied": campaignId } },
      { upsert: true, new: true }
    );

    // Get applicant's full info
    const user = await userModel.findById(userId).select("fullname");

    // Emit real-time updates
    const io = req.app.get("io");
    const donorId = updatedCampaign.createdBy?._id?.toString();

    if (io && donorId && user) {
      io.emit("meal_applied", {
        mealId: updatedCampaign._id,
        newApplicant: {
          p_id: { _id: userId, fullname: user.fullname },
          persons: appliedPersons,
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
