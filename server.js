// IMPORTS
import dotenv from 'dotenv'; // Import dotenv
import express from 'express'; // Import express
import connectDB from './config/db.js'; // Import connectDB function
import childrenRoutes from './routes/ChildrenRoutes.js'; // Import Children routes
import medicalRecordsRoutes from './routes/MedicalRecordsRoutes.js'; // Import Medical Records routes
import milestoneRoutes from './routes/MilestoneRoutes.js'; // Import Milestones routes
import vaccineRoutes from './routes/VaccineRoutes.js'; // Import Vaccines routes

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express(); // Initialize express
app.use(express.json()); // Middleware for parsing JSON

// Use routes
app.use('/api/children', childrenRoutes);
app.use('/api/medical-records', medicalRecordsRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/vaccines', vaccineRoutes);

const PORT = process.env.PORT || 5000; // Port
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

// Home Route
app.get('/', (req, res) => {
    res.send('Home Page');
});