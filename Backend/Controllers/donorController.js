const campaignModel = require("../Models/campaignModel");
const userModel = require("../Models/userModel");
const { ACTIVE, GRANTED, EXPIRED } = require("../constantVariables");
const Recipient = require("../Models/recipentModel");

async function createCampaign(req, res) {
  const {
    title,
    foodType,
    amount,
    expiration,
    mealType,
    location,
    phone,
    description,
  } = req.body;

  if (
    !title ||
    !foodType ||
    !amount ||
    !expiration ||
    !mealType ||
    !location ||
    !phone ||
    !description
  ) {
    return res
      .status(400)
      .json({ error: "All fields are required", success: false });
  }

  try {
    // Convert expiration string into Date object
    const expirationDate = new Date(expiration);
    const now = new Date();

    // Set status based on current datetime
    const initialStatus = expirationDate <= now ? EXPIRED : ACTIVE;

    const createdCampaign = await campaignModel.create({
      createdBy: req.user._id,
      title,
      foodType,
      amount,
      remaining: amount,
      expiration,
      expirationDate,
      mealType,
      location,
      status: initialStatus,
      phone,
      description,
    });

    if (!createdCampaign) {
      return res
        .status(400)
        .json({ message: "Campaign Not created!", success: false });
    }

    const newCampaign = await campaignModel
      .findById(createdCampaign._id)
      .populate("createdBy", "fullname")
      .populate({
        path: "applied.p_id",
        select: "fullname",
      });

    if (!newCampaign) {
      return res
        .status(404)
        .json({ message: "Associated Data Not Found!", success: false });
    }

    res.status(200).json({
      message: "New Campaign added successfully",
      success: true,
      newCampaign,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error", success: false, err });
  }
}

async function updateProfile(req, res) {
  const { fullname, email, phone, organization } = req.body;

  if (!fullname || !email || !phone || !organization) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }

  try {
    const user = req.user;

    if (!user || !user._id) {
      console.log("No user found in the request.");
      return res
        .status(404)
        .json({ success: false, error: "User not found or invalid token" });
    }

    // Update the user data with the data from req.body
    const updatedUser = await userModel.updateOne(
      { _id: user._id },
      {
        $set: {
          fullname: fullname,
          email: email,
          phone: phone,
          organization: organization,
        },
      }
    );

    if (!updatedUser) {
      return res
        .status(400)
        .json({ message: "Not successed to update user!", success: false });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        phone: updatedUser.phone,
        organization: updatedUser.organization,
      },
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ success: false, error: "Server error", err });
  }
}

async function getHistory(req, res) {
  try {
    const { userId, status } = req.query;
    if (!userId || !status) {
      return res.status(400).json({ error: "userId and status are required" });
    }

    for (const key in req.body) {
      if (req.body[key] === null || req.body[key] === undefined) {
        return res.status(400).json({
          error: `Field '${key}' in body cannot be null or undefined`,
        });
      }
    }

    // Validate the status (active, granted, blacklisted)
    if (![ACTIVE, GRANTED, EXPIRED].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Find campaigns based on userId and status
    const campaigns = await campaignModel
      .find({ createdBy: userId, status: status })
      .populate("createdBy", "fullname") // Populate createdBy with user's fullname
      .populate({
        path: "applied.p_id", // Populate the user inside applied array
        select: "fullname", // Only fetch fullname from users
      })
      .sort({ createdAt: -1 })
      .exec();

    if (!campaigns) {
      return res
        .status(404)
        .json({ message: "Campaign not Found!", success: false });
    }

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

async function getUserData(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Id not found!", success: false });
  }
  try {
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ error: "user Not found!", success: false });
    }

    const { password: _, ...UserData } = user._doc;

    res.status(200).json({
      message: "Selected receipeinet data Fetch Successfully!",
      success: true,
      UserData,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error while fetching selected reciepient data!",
      success: false,
    });
  }
}

async function updateStatus(req, res) {
  const { id, p_id, p_name, awardfor } = req.params;

  if (!id || !p_id || !p_name || !awardfor) {
    return res
      .status(400)
      .json({ error: "Please provide required data!", success: false });
  }

  try {
    const campaign = await campaignModel
      .findById(id)
      .populate("createdBy", "fullname") // Populate createdBy with user's fullname
      .populate({
        path: "applied.p_id", // Populate the user inside applied array
        select: "fullname", // Only fetch fullname from users
      });

    if (!campaign) {
      return res.status(404).json({
        error: "Campaign not found",
        success: false,
      });
    }

    const awardPersons = parseInt(awardfor);
    if (isNaN(awardPersons) || awardPersons <= 0) {
      return res.status(400).json({
        error: "Invalid number of persons to award!",
        success: false,
      });
    }

    const remaining =
      campaign.remaining ??
      campaign.amount -
        campaign.awarded.reduce(
          (sum, award) => sum + parseInt(award.a_person || 0),
          0
        );

    if (awardPersons > remaining) {
      return res.status(400).json({
        error: `Only ${remaining} meals left to award!`,
        success: false,
      });
    }

    // Push new awarded entry
    const awardedEntry = {
      p_id,
      p_name,
      a_date: new Date(),
      a_person: awardPersons,
    };
    campaign.awarded.push(awardedEntry);

    // Update remaining and status
    campaign.remaining = remaining - awardPersons;

    if (campaign.remaining <= 0) {
      campaign.status = GRANTED; // or GRANTED if constant
    }

    // Remove current and invalid applications
    campaign.applied = campaign.applied.filter((app) => {
      return app.p_id._id.toString() !== p_id.toString();
    });

    await campaign.save();

    // Update recipient side
    await Recipient.findOneAndUpdate(
      { userId: p_id },
      { $addToSet: { "actions.awarded": id } },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      message: "Meal awarded successfully!",
      success: true,
      campaign,
      remaining: campaign.remaining,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Server error while updating status!",
      success: false,
    });
  }
}

// get meal summary
async function statsSummary(req, res) {
  const { id } = req.params;
  if (!id) {
    return res
      .status(500)
      .json({ error: "Plz provide required Fields!", success: false });
  }
  try {
    const active = await campaignModel.countDocuments({
      createdBy: id,
      status: ACTIVE,
    });

    const granting = await campaignModel.countDocuments({
      createdBy: id,
      status: GRANTED,
    });

    const blacklist = await campaignModel.countDocuments({
      createdBy: id,
      status: EXPIRED,
    });

    res.status(200).json({
      message: "Fetch stats summary successfully!",
      success: true,
      data: { active, granting, blacklist },
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error while fetching stats summary!",
      success: false,
    });
  }
}

// delate a campaign
async function deleteCampaign(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID not Found!", success: false });
  }
  try {
    const deletedCampaign = await campaignModel.deleteOne({ _id: id });
    if (!deleteCampaign) {
      return res
        .status(404)
        .json({ error: "Campaign not Found!", success: false });
    }
    res.status(200).json({
      message: "Campaign deleted successfully!",
      success: true,
      deletedCampaign,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error while deleting a campaign!",
      success: false,
    });
  }
}

module.exports = {
  createCampaign,
  updateProfile,
  getHistory,
  getUserData,
  updateStatus,
  statsSummary,
  deleteCampaign,
};
