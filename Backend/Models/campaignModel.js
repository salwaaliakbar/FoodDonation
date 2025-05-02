const mongoose = require("mongoose");

const campaignSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  foodType: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  expiration: {
    type: Date,
    required: true,
  },
  mealType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("campaign", campaignSchema);
