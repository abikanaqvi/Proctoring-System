const Test = require('../models/test');
const User = require('../models/user');
const shortid = require('shortid');



const createTest = async (req, res) => {
    console.log(req.body);  // Log the incoming data
    try {
        const { email, test_name, test_link_by_user, start_time, end_time, no_of_candidates_appear, total_threshold_warnings } = req.body;
        const test = new Test({
            userId: req.user.id,
            email,
            test_name,
            test_link_by_user,
            test_code: shortid.generate() + "-" + shortid.generate(),
            start_time,
            end_time,
            no_of_candidates_appear,
            total_threshold_warnings
        });
        const data = await test.save();
        return res.status(201).json({ msg: "Successfully created new Test on platform", data });
    } catch (error) {
        console.error("Error creating test:", error);
        return res.status(400).json({ msg: "Something happened while creating new test", error });
    }
};




// Fetch all tests created by a user
const userCreatedTests = (req, res) => {
    const userId = req.user.id;
    if (userId) {
        Test.find({ userId: userId })
            .exec((error, _allTests) => {
                if (error) return res.status(400).json({ msg: "Something went wrong while fetching user tests", error });
                return res.status(200).json({ _allTests });
            });
    } else {
        return res.status(400).json({
            msg: {
                one: "Check user ID, something is wrong with it",
                two: "Can't pass empty userId"
            }
        });
    }
};

// Register for an exam
const testRegister = async (req, res) => {
    const { test_code } = req.params;
    const userId = req.user.id;
    if (userId) {
        await User.findOneAndUpdate({ _id: userId }, { test_code: test_code });
        return res.status(200).json({ msg: "Now you are registered" });
    }
};

// Get admin data for a test
const testAdminData = (req, res) => {
    const { test_code } = req.params;
    if (test_code) {
        User.find({ test_code: test_code })
            .exec((error, candidates) => {
                if (error) return res.status(400).json({ msg: "Something went wrong while fetching candidates' status" });
                return res.status(200).json({ candidates });
            });
    }
};

// Increase warning for person detected
const increasePersonDetected = async (req, res) => {
    const userId = req.user.id;
    if (userId) {
        await User.findOneAndUpdate({ _id: userId }, { $inc: { person_detected: 1 } });
        return res.status(200).json({ msg: "Warning of person detected" });
    }
};

// Increase warning for voice detected
const increaseVoiceDetected = async (req, res) => {
    const userId = req.user.id;
    if (userId) {
        await User.findOneAndUpdate({ _id: userId }, { $inc: { voice_detected: 1 } });
        return res.status(200).json({ msg: "Warning of voice detected" });
    }
};

// Increase warning for face covering
const increaseFaceCovering = async (req, res) => {
    const userId = req.user.id;
    if (userId) {
        await User.findOneAndUpdate({ _id: userId }, { $inc: { face_covered: 1 } });
        return res.status(200).json({ msg: "Warning for face covering" });
    }
};

// Get total warnings for a user
const totalWarnings = (req, res) => {
    const userId = req.user.id;
    if (userId) {
        User.findOne({ _id: userId })
            .exec((error, data) => {
                if (data) {
                    let total_warnings = data.person_detected + data.voice_detected + data.face_covered;
                    return res.status(200).json({ totalWarnings: total_warnings });
                }
            });
    } else {
        return res.status(400).json({ msg: "Check user ID" });
    }
};

// Terminate an exam for a candidate
const terminateExam = async (req, res) => {
    const userId = req.user.id;
    if (userId) {
        await User.findOneAndUpdate({ _id: userId }, { status: "block" });
        return res.status(200).json({ msg: "Candidate has been blocked" });
    }
};

// Allow a candidate to take an exam
const allowInExam = async (req, res) => {
    const userId = req.user.id;
    if (userId) {
        await User.findOneAndUpdate({ _id: userId }, { status: "safe" });
        return res.status(200).json({ msg: "Candidate is now allowed to give exam" });
    }
};

// Export functions
module.exports = {
    createTest,
    userCreatedTests,
    testRegister,
    testAdminData,
    increasePersonDetected,
    increaseVoiceDetected,
    increaseFaceCovering,
    totalWarnings,
    terminateExam,
    allowInExam
};
