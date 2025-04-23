const TestModel = require("../models/Test");

// Create a new test with all fields
const createTest = async (req, res) => {
  try {
    const {
      email,
      organizationName,
      testName,
      questionPaperLink,
      expectedCandidates,
      startDate,
      duration,
    } = req.body;

    if (
      !email || !organizationName || !testName || !questionPaperLink ||
      !expectedCandidates || !startDate || !duration
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTest = new TestModel({
      email,
      organizationName,
      testName,
      questionPaperLink,
      expectedCandidates,
      startDate: new Date(startDate),
      duration,
      title: testName,
    });

    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    console.error("❌ Create Test Error:", err);
    res.status(500).json({ error: "Failed to create test" });
  }
};

// Fetch all tests
const getAllTests = async (req, res) => {
  try {
    const tests = await TestModel.find().sort({ createdAt: -1 });
    res.json(tests);
  } catch (err) {
    console.error("❌ Fetch Tests Error:", err);
    res.status(500).json({ error: "Failed to fetch tests" });
  }
};

module.exports = { createTest, getAllTests };
