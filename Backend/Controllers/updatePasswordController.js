const userModel = require("../Models/userModel");
require("dotenv").config();
const bcrypt = require("bcrypt");

async function updatePassword(req, res) {
  console.log("hello");
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({
        error: "Email is not Registered in our Database",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    res
      .status(200)
      .json({ message: "Password update successfully! ", success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error ", err, success: false });
  }
}

module.exports = updatePassword;
