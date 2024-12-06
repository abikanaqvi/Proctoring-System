const express = require('express'); 
const env = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Load environment variables from .env file
env.config();

const app = express();
const PORT = process.env.PORT || 2000; // Default port
const DB_URL = process.env.DB_URL; // Database URL

// Check if DB_URL is defined
if (!DB_URL) {
    console.error('Error: Database URL is not defined in .env file');
    process.exit(1);
}

mongoose.set('strictQuery', false); // Mongoose query setting

// Middlewares
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Aankh API!');
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// MongoDB connection function
const connectDB = async (dburl) => {
    try {
        console.log('Connecting to database at:', dburl); // Log the DB URL
        await mongoose.connect(dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

// Test Schema
const Test = mongoose.model('Test', new mongoose.Schema({
    name: String,
    code: String,
}));

// Create a test
app.post('/api/create-test', async (req, res) => {
    const { testName } = req.body;
    const testCode = Math.random().toString(36).substring(2, 10); // Generate random test code
    const newTest = new Test({ name: testName, code: testCode });
    await newTest.save();
    res.json({ message: 'Test created successfully!', testCode: newTest.code });
});

// Join a test
app.get('/api/join-test', async (req, res) => {
    const testCode = req.query.testCode;
    const test = await Test.findOne({ code: testCode });
    
    if (test) {
        res.json({ message: `Successfully joined the test: ${test.name}` });
    } else {
        res.json({ message: 'Test not found. Please check the code and try again.' });
    }
});

// Serve static files from the 'uploads' directory
app.use('/public', express.static(path.join(__dirname, 'uploads')));

// Start server function
const start = async () => {
    await connectDB(DB_URL); // Connect to the database
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

// Invoke the start function to run the app
start();
