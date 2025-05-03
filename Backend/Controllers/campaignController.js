const campaignModel = require("../Models/campaignModel");

async function campaignController(req, res) {
  const { title, foodType, amount, expiration, mealType, location, phone, description } = req.body;
  try {
    const newCampaign = await campaignModel.create({
      createdBy: req.user._id,
      title,
      foodType,
      amount,
      expiration,
      mealType,
      location,
      status: 'Expired',
      phone,
      description
    });
    res
      .status(200)
      .json({ message: "New Campaign added successfully",success:true , newCampaign });
  } catch (err) {
    res.status(500).json({ error: "Server Error", err, success: false });
  }
}

module.exports = campaignController;
