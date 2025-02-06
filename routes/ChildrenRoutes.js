import express from 'express';
import mongoose from 'mongoose';
import Child from '../components/Children.js';
import MedicalRecord from '../components/MedicalRecords.js';
import Milestone from '../components/Milestone.js';

const router = express.Router();

// Create a new child
router.post('/users/:userId/children', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    const newChild = new Child({ ...req.body, userId });
    await newChild.save();
    res.status(201).json(newChild);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch a child by ID
router.get('/:childId', async (req, res) => {
  try {
    const child = await Child.findById(req.params.childId);
    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }
    res.status(200).json(child);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch medical records for a child
router.get('/:childId/medical-records', async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.find({ childId: req.params.childId });
    res.status(200).json(medicalRecords);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch milestones for a child
router.get('/:childId/milestones', async (req, res) => {
  try {
    const milestones = await Milestone.find({ childId: req.params.childId });
    res.status(200).json(milestones);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add a medical record for a child
router.post('/:childId/medical-records', async (req, res) => {
  try {
    const { childId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(childId)) {
      return res.status(400).json({ message: 'Invalid child ID format' });
    }
    const medicalRecord = new MedicalRecord({ ...req.body, childId });
    await medicalRecord.save();
    res.status(201).json(medicalRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add a milestone for a child
router.post('/:childId/milestones', async (req, res) => {
  try {
    const { childId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(childId)) {
      return res.status(400).json({ message: 'Invalid child ID format' });
    }
    const milestone = new Milestone({ ...req.body, childId });
    await milestone.save();
    res.status(201).json(milestone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;