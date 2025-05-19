async function updateProfile(req, res) {
  const { fullname, email, phone, organization } = req.body;

  if (!fullname || !email || !phone || !organization) {
    return res.status(400).json({ success: false, error: "All fields are required" });
  }
  
  try {
    const user = req.user;

    if (!user || !user._id) {
      console.log("No user found in the request.");
      return res.status(404).json({ success: false, error: "User not found or invalid token" });
    }

    // Update the user data with the data from req.body
    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.organization = organization || user.organization;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        organization: user.organization,
      },
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ success: false, error: "Server error", err });
  }
}

module.exports = updateProfile;
