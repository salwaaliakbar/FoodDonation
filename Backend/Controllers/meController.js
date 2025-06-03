const userModel = require("../Models/userModel");
const campaignModel = require("../Models/campaignModel");

async function refresh(req, res) {
  console.log("inside controller");
  try {
    const user = req.user;

    if (!user || !user._id) {
      console.log("No user found in the request.");
      return res
        .status(404)
        .json({ success: false, error: "User not found or invalid token" });
    }

    const users = await userModel.findOne({ _id: user._id });

    const activeMeals = await campaignModel
      .find({ createdBy: user._id, status: "Active" })
      .populate("createdBy", "fullname")
      .sort({ createdAt: -1 })
      .exec();

    const grantedMeals = await campaignModel
      .find({ createdBy: user._id, status: "Awarded" })
      .populate("createdBy", "fullname")
      .sort({ createdAt: -1 })
      .exec();

    const blacklistMeals = await campaignModel
      .find({ createdBy: user._id, status: "Expired" })
      .populate("createdBy", "fullname")
      .sort({ createdAt: -1 })
      .exec();

      const { password:_, ...userDetails } = users._doc;

    res
      .status(200)
      .json({
        message: "Data fetch successfully",
        success: true,
        userDetails,
        activeMeals,
        grantedMeals,
        blacklistMeals,
      });
  } catch (err) {
    console.error("Error refreshing data:", err);
    res.status(500).json({ success: false, error: "Server error", err });
  }
}

module.exports = refresh;
