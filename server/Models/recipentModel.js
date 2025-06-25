const mongoose = require("mongoose");

const RecipientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  actions: {
    applied: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campaigns",
      },
    ],
    awarded: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campaigns",
      },
    ],
  },
});

module.exports = mongoose.model("recipent", RecipientSchema);
