const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  email: { type: String, required: true },
  organizationName: { type: String, required: true },
  testName: { type: String, required: true },
  questionPaperLink: { type: String, required: true },
  expectedCandidates: { type: Number, required: true },
  startDate: { type: String, required: true },
  duration: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Test", testSchema);
