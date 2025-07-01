const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Basic Auth Info
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // Biodata Fields
    surname: String,
    caste: { type: String, default: "Chandra" },
    motherName: String,
    fatherName: String,
    income: String,
    farmingLand: String, // Jamin (kheti)
    isRemarriage: Boolean, // Second marriage?
    passion: String,
    village: String,
    city: String,
    state: String,
    familyBackground: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
