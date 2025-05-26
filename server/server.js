require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const EmployeeModel = require("./models/user");
const testController = require("./controllers/testController");

const app = express();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173",
      "http://localhost:3000",
      "https://hawkeye-tau.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());

// MongoDB Connection
const DB_URL = process.env.DB_URL;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

mongoose.connection.on("disconnected", () => {
  console.log("❌ MongoDB disconnected! Reconnecting...");
  setTimeout(() => {
    mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  }, 5000);
});

// JWT Secret Check
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET is not set in .env");
  process.exit(1);
}

// Register Route
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new EmployeeModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .json({ message: "Login successful", token });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// Logout Route
app.get("/api/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
});

// JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// Profile Route
app.get("/api/profile", verifyToken, async (req, res) => {
  try {
    const user = await EmployeeModel.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error("❌ Profile Fetch Error:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// ✅ Routes for Tests
app.post("/api/tests", testController.createTest); // Create a new test
app.get("/api/tests", testController.getAllTests); // Fetch all tests

// Server Start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));