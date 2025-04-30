const userModel = require('../Models/userModel')

async function updateProfile(req, res) {
  const { fullname, email, phone, organization } = req.body;
  try{
    const user = await userModel.findById(req.user.id); 

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    user.fullname = fullname;
    user.email = email;
    user.phone = phone;
    user.organization = organization;

    await user.save();

    res.status(200).json({ success: true, user })
  } catch(err){
    console.error("Error updating user:", err);
    res.status(500).json({ success: false, error: "Server error",err });
  }
}

module.exports = updateProfile