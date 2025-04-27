const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");

async function signup(req, res) {
  const { fullname, email, phone, organization, role, username, password } =
    req.body;

  try {
    const user = await userModel.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username Should be Unique", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = await userModel.create({
      fullname,
      email,
      phone,
      organization,
      role,
      username,
      password: hashedPassword,
      confrimPassword: hashedPassword,
    });

    res.status(200).json({ message: "Newuser Registered Successfully", success:true, newuser });

  } catch (err) {
    res.status(500).json({ error: "Server error ", err, success: false });
  }
}

module.exports = signup;
