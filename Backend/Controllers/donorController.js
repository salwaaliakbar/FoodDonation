const campaignModel = require("../Models/campaignModel");
const userModel = require("../Models/userModel");
const { ACTIVE, GRANTED, EXPIRED } = require("../constantVariables");
const Recipient = require("../Models/recipentModel"); // Import Recipient model

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

    const newCampaign = await campaignModel.create({
      createdBy: req.user._id,
      title,
      foodType,
      amount,
      expiration,
      expirationDate,
      mealType,
      location,
      status: initialStatus,
      phone,
      description,
    });

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
    return res.status(400).json({ message: "Id not found!", success: false });
  }
  try {
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user Not found!", success: false });
    }

    const { password: _, ...UserData } = user._doc;

    res.status(200).json({
      message: "Selected receipeinet data Fetch Successfully!",
      success: true,
      UserData,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error while fetching selected reciepient data!",
      success: false,
    });
  }
}

// update status handler
async function updateStatus(req, res) {
  const { id, p_id, p_name } = req.params;

  if (!id || !p_id || !p_name) {
    return res
      .status(400)
      .json({ message: "Plz provide required data!", success: false });
  }
  try {
    const updateStatus = await campaignModel.updateOne(
      { _id: id },
      {
        $set: {
          status: GRANTED,
          awarded: { p_id, p_name },
        },
      }
    );

    // Update the Recipient model (push campaignId into actions.applied)
    await Recipient.findOneAndUpdate(
      { userId: p_id },
      { $addToSet: { "actions.awarded": id } }, // $addToSet avoids duplicates
      { upsert: true, new: true } // Create if not exists
    );

    res.status(200).json({
      message: "Meal Status update successfully!",
      success: true,
      updateStatus,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error while updating status!", success: false });
  }
}

// get meal summary
async function statsSummary(req, res) {
  const { id } = req.params;
  if (!id) {
    return res
      .status(500)
      .json({ message: "Plz provide required Fields!", success: false });
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
    console.log(granting);
    const blacklist = await campaignModel.countDocuments({
      createdBy: id,
      status: EXPIRED,
    });
    console.log(blacklist);

    res.status(200).json({
      message: "Fetch stats summary successfully!",
      success: true,
      data: { active, granting, blacklist },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error while fetching stats summary!",
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
};
