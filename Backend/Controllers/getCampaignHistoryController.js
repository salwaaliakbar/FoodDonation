const Campaign = require('../Models/campaignModel');

async function getHistory(req, res)  {
  try {
    const { userId, status } = req.query;

    // Validate the status (active, granted, blacklisted)
    if (!['Active', 'Awarded', 'Expired'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    // Find campaigns based on userId and status
    const campaigns = await Campaign.find({ createdBy: userId, status: status })
      .populate('createdBy', 'fullname')  // Populate createdBy with user's fullname
      .exec();

    console.log('campaigns', campaigns)

    res.status(200).json({message:'Fetch Campaigns sucsessfully', success: true, campaigns})
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = getHistory;
