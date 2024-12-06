// test.routes.js

const express = require("express");
const {
    createTest,
    userCreatedTests,
    testAdminData,
    testRegister,
    increasePersonDetected,
    increaseVoiceDetected,
    increaseFaceCovering,
    totalWarnings,
    terminateExam,
    allowInExam,
} = require("../controllers/test.control");
const { requireSignIn } = require("../middlewares");
const router = express.Router();



// User/admin can create a test
router.post("/create-test", requireSignIn, createTest);

// User/admin can fetch a list of tests they created
router.get("/all-created-test", requireSignIn, userCreatedTests);

// For registering for the exam
router.patch("/test-register/:test_code", requireSignIn, testRegister);

// User/admin can fetch the live status of the test
router.get("/test-live-status/:test_code", requireSignIn, testAdminData);

// Increasing warning count for person detected
router.patch("/warning-person-detected", requireSignIn, increasePersonDetected);

// Increasing warning count for voice detected
router.patch("/warning-voice-detected", requireSignIn, increaseVoiceDetected);

// Increasing warning count for face covering
router.patch("/warning-face-covering", requireSignIn, increaseFaceCovering);

// Get total number of warnings given to a user
router.get("/total-warnings", requireSignIn, totalWarnings);

// Route to terminate the exam for a candidate
router.patch("/terminate", requireSignIn, terminateExam);

// Route to allow terminated candidates to take an exam
router.patch("/allow-in-exam", requireSignIn, allowInExam);

// Export the router
module.exports = router;
