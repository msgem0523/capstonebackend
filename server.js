import dotenv from 'dotenv'; // Import dotenv
import express from 'express'; // Import express
import cors from 'cors'; // Import cors
import connectDB from './config/db.js'; // Import connectDB function
import userRoutes from './routes/UserRoutes.js'; // Import User routes
import childrenRoutes from './routes/ChildrenRoutes.js'; // Import Children routes
import medicalRecordsRoutes from './routes/MedicalRecordsRoutes.js'; // Import Medical Records routes
import milestoneRoutes from './routes/MilestoneRoutes.js'; // Import Milestones routes

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express(); // Initialize express

app.use(cors()); // CORS Middleware
app.use(express.json()); // JSON Middleware

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/children', childrenRoutes);
app.use('/api/medical-records', medicalRecordsRoutes);
app.use('/api/milestones', milestoneRoutes);

const PORT = process.env.PORT || 5000; // Port
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Home Route
app.get('/', (req, res) => {
    res.send('Home Page');
});
