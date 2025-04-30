const campaignModel = require("../Models/campaignModel");

async function campaignController(req, res) {
  const { title, foodType, amount, expiration, mealType, location } = req.body;
  try {
    const newCampaign = await campaignModel.create({
      title,
      foodType,
      amount,
      expiration,
      mealType,
      location,
    });
    res
      .status(200)
      .json({ message: "New Campaign added successfully",success:true , newCampaign });
  } catch (err) {
    res.status(500).json({ error: "Server Error", err, success: false });
  }
}

module.exports = campaignController;
