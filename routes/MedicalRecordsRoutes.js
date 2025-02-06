import express from 'express';
import mongoose from 'mongoose';
import MedicalRecord from '../components/MedicalRecords.js';
import Child from '../components/Children.js';

const router = express.Router();

// GET all medical records
router.get('/', async (req, res) => {
    try {
        const medicalRecords = await MedicalRecord.find();
        res.status(200).json(medicalRecords);
    } catch (error) {
        console.error('Error fetching medical records:', error);
        res.status(500).json({ message: error.message });
    }
});

// GET a medical record by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    try {
        const medicalRecord = await MedicalRecord.findById(id);
        if (!medicalRecord) return res.status(404).json({ message: 'Medical record not found' });
        res.status(200).json(medicalRecord);
    } catch (error) {
        console.error('Error fetching medical record by ID:', error);
        res.status(500).json({ message: error.message });
    }
});

// POST a new child (example endpoint)
router.post('/children', async (req, res) => {
    const { name, age, medicalRecordId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(medicalRecordId)) {
        return res.status(400).json({ message: 'Invalid medical record ID format' });
    }
    try {
        const child = new Child({ name, age, medicalRecord: medicalRecordId });
        await child.save();
        res.status(201).json(child);
    } catch (error) {
        console.error('Error adding child:', error);
        res.status(500).json({ message: error.message });
    }
});

// POST request to add a new medical record
router.post('/api/children/:childId/medical-records', async (req, res) => {
    const { childId } = req.params;
    const { date, location, height, weight, headCircumference, notes } = req.body;

    try {
        const child = await Child.findById(childId);
        if (!child) {
            return res.status(404).json({ error: 'Child not found' });
        }

        const newMedicalRecord = new MedicalRecord({
            childId,
            date,
            location,
            height,
            weight,
            headCircumference,
            notes
        });
        await newMedicalRecord.save();

        res.status(201).json(newMedicalRecord);
    } catch (error) {
        console.error('Error adding medical record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT: Update a medical record by ID
router.put('/:id', async (req, res) => {
    const { childId, date, location, height, weight, headCircumference, notes } = req.body;

    try {
        const updatedMedicalRecord = await MedicalRecord.findByIdAndUpdate(req.params.id, {
            childId,
            date,
            location,
            height,
            weight,
            headCircumference,
            notes
        }, { new: true });
        if (!updatedMedicalRecord) return res.status(404).json({ message: 'Medical record not found' });
        res.status(200).json(updatedMedicalRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Delete a medical record by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedMedicalRecord = await MedicalRecord.findByIdAndDelete(req.params.id);
        if (!deletedMedicalRecord) return res.status(404).json({ message: 'Medical record not found' });
        res.status(200).json({ message: 'Medical record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;