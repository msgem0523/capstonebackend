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

// Fetch children for a user
router.get('/users/:userId/children', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    const children = await Child.find({ userId });
    res.status(200).json(children);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET all children
router.get('/', async (req, res) => {
  try {
    const children = await Child.find();
    res.status(200).json(children);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a child by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const child = await Child.findById(id);
    if (!child) return res.status(404).json({ message: 'Child not found' });
    res.status(200).json(child);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a child by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const updatedChild = await Child.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedChild) return res.status(404).json({ message: 'Child not found' });
    res.status(200).json(updatedChild);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a child by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const deletedChild = await Child.findByIdAndDelete(id);
    if (!deletedChild) return res.status(404).json({ message: 'Child not found' });
    res.status(200).json({ message: 'Child deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add medical record log
router.post('/children/:childId/medical-records', async (req, res) => {
  try {
    const { childId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(childId)) {
      return res.status(400).json({ message: 'Invalid child ID format' });
    }
    const medicalRecord = new MedicalRecord({ ...req.body, child: childId });
    await medicalRecord.save();
    res.status(201).json(medicalRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add milestone log
router.post('/children/:childId/milestones', async (req, res) => {
  try {
    const { childId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(childId)) {
      return res.status(400).json({ message: 'Invalid child ID format' });
    }
    const milestone = new Milestone({ ...req.body, child: childId });
    await milestone.save();
    res.status(201).json(milestone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;