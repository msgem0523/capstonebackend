// IMPORTS
import mongoose from 'mongoose'; // Import mongoose
import dotenv from 'dotenv'; // Import dotenv
import express from 'express'; // Import express
import connectDB from './config/db.js'; // Import connectDB function

dotenv.config(); // Load environment variables

const app = express(); // Initialize express
app.use(express.json()); // Middleware for parsing JSON
const port = process.env.PORT || 5000; // Port

// Start server
app.listen(5000, () => {
    console.log(`Server running on port ${port}`);
});