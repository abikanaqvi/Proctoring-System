const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
      trim: true,
    },
    organizationName: {
      type: String,
      required: [true, "Organization name is required"],
      trim: true,
    },
    testName: {
      type: String,
      required: [true, "Test name is required"],
      trim: true,
    },
    questionPaperLink: {
      type: String,
      required: [true, "Question paper link is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: "Please enter a valid URL",
      },
    },
    expectedCandidates: {
      type: Number,
      required: [true, "Expected number of candidates is required"],
      min: [1, "At least one candidate is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration (in minutes) is required"],
      min: [1, "Duration must be at least 1 minute"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", TestSchema);
