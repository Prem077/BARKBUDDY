import mongoose from "mongoose";

const ExpertiseDonationSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  typeOfExpertise: {
    type: String,
    required: true, // e.g., 'training', 'veterinary services', etc.
  },
  hours: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.ExpertiseDonation ||
  mongoose.model("ExpertiseDonation", ExpertiseDonationSchema);
