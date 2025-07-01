const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    surname: String,
    gender: String,
    age: Number,
    caste: String,
    motherName: String,
    fatherName: String,
    income: String,
    farmingLand: String,
    isRemarriage: Boolean,
    passion: String,
    education: String,
    occupation: String,
    familyBackground: String,
    village: String,
    city: String,
    state: String,
    mobile: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
