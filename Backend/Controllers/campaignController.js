const campaignModel = require("../Models/campaignModel");

async function campaignController(req, res) {
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

  try {
    // Convert expiration string into Date object
    const expirationDate = new Date(expiration);
    const now = new Date();

    // Set status based on current datetime
    const initialStatus = expirationDate <= now ? "Expired" : "Active";

    const newCampaign = await campaignModel.create({
      createdBy: req.user._id,
      title,
      foodType,
      amount,
      expiration: expirationDate,
      mealType,
      location,
      status: initialStatus,
      phone,
      description,
    });

    res.status(200).json({ message: "New Campaign added successfully", success: true, newCampaign });
    
  } catch (err) {
    res.status(500).json({ error: "Server Error", success: false, err });
  }
}

module.exports = campaignController;
