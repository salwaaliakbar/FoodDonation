const mongoose = require("mongoose");

// Applied subdocument schema
const AppliedSchema = new mongoose.Schema(
  {
    p_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    date: { type: Date, required: true },
    persons: { type: Number, required: true },
  },
  { _id: false }
);

// Awarded subdocument schema
const AwardedSchema = new mongoose.Schema(
  {
    p_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    a_date: { type: Date, required: true },
    a_persons: { type: Number, required: true },
  },
  { _id: false }
);

const awardedSchema = mongoose.Schema({
  p_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  p_name: {
    type: String,
    required: true,
  },
});

const campaignSchema = mongoose.Schema(
  {
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
    phone: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    applied: {
      type: [AppliedSchema],
      default: [],
    },
    awarded: awardedSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("campaign", campaignSchema);
