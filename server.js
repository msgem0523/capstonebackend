// IMPORTS
import dotenv from 'dotenv'; // Import dotenv
import express from 'express'; // Import express
import connectDB from './config/db.js'; // Import connectDB function

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express(); // Initialize express
app.use(express.json()); // Middleware for parsing JSON

const PORT = process.env.PORT || 5000; // Port
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

// Home Route
app.get('/', (req, res) => {
    res.send('Home Page');
});