const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    test_code: {
      type: String,
      default: "none",
    },
    multi_window: {
      type: Number,
      default: 0,
    },
    full_screen: {
      type: Number,
      default: 0,
    },
    person_detected: {
      type: Number,
      default: 0,
    },
    voice_detected: {
      type: Number,
      default: 0,
    },
    face_covered: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "safe",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
