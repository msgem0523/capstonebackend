import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './components/User.js';
import Children from './components/Children.js';
import MedicalRecord from './components/MedicalRecords.js';
import Milestone from './components/Milestone.js';
import Vaccine from './components/Vaccines.js';

dotenv.config(); // Load environment variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Children.deleteMany();
        await MedicalRecord.deleteMany();
        await Milestone.deleteMany();
        await Vaccine.deleteMany();

        // Read JSON files
        const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'database/User.json'), 'utf-8'));
        const children = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'database/Children.json'), 'utf-8'));
        const medicalRecords = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'database/MedicalRecords.json'), 'utf-8'));
        const milestones = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'database/Milestone.json'), 'utf-8'));
        const vaccines = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'database/Vaccines.json'), 'utf-8'));

        // Insert data into the database
        await User.insertMany(users);
        await Children.insertMany(children);
        await MedicalRecord.insertMany(medicalRecords);
        await Milestone.insertMany(milestones);
        await Vaccine.insertMany(vaccines);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // Delete all data from the collections
        await User.deleteMany();
        await Children.deleteMany();
        await MedicalRecord.deleteMany();
        await Milestone.deleteMany();
        await Vaccine.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

connectDB();