const tracer = require('dd-trace').init(); // Initialize Datadog tracer
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Score = require('./models/Score');
require('dotenv').config(); // Add this line to load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// CORS middleware should be first
const corsOptions = {
    origin: '*', // For development only. In production, set to your specific domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS before other middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route to verify server is running
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working' });
});

// Connect to MongoDB
connectDB(); // This line should just call the function, not include the connection string

// Routes with error handling
app.post('/api/scores', async (req, res) => {
    try {
        console.log('Received score data:', req.body); // Debug log
        const newScore = new Score(req.body);
        const savedScore = await newScore.save();
        console.log('Saved score:', savedScore);
        res.status(201).json(savedScore);
    } catch (error) {
        console.error('Error saving score:', error); // Debug log
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/scores', async (req, res) => {
    try {
        const scores = await Score.find().sort({ score: -1 }).limit(10);
        res.json(scores);
    } catch (error) {
        console.error('Error fetching scores:', error); // Debug log
        res.status(500).json({ message: error.message });
    }
});

// Add this middleware right after your cors middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 