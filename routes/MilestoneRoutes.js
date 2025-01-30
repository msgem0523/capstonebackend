import express from 'express';
import Milestone from '../components/Milestone.js';

const router = express.Router();

// GET all milestones
router.get('/', async (req, res) => {
    try {
        const milestones = await Milestone.find();
        res.status(200).json(milestones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a milestone by ID
router.get('/:id', async (req, res) => {
    try {
        const milestone = await Milestone.findById(req.params.id);
        if (!milestone) return res.status(404).json({ message: 'Milestone not found' });
        res.status(200).json(milestone);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Create a new milestone
router.post('/', async (req, res) => {
    const { childId, date, category, description } = req.body;
    const newMilestone = new Milestone({
        childId,
        date,
        category,
        description,
    });

    try {
        const savedMilestone = await newMilestone.save();
        res.status(201).json(savedMilestone);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT: Update a milestone by ID
router.put('/:id', async (req, res) => {
    const { childId, date, category, description } = req.body;

    try {
        const updatedMilestone = await Milestone.findByIdAndUpdate(
            req.params.id,
            { childId, date, category, description },
            { new: true, runValidators: true }
        );
        if (!updatedMilestone) return res.status(404).json({ message: 'Milestone not found' });
        res.status(200).json(updatedMilestone);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Delete a milestone by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedMilestone = await Milestone.findByIdAndDelete(req.params.id);
        if (!deletedMilestone) return res.status(404).json({ message: 'Milestone not found' });
        res.status(200).json({ message: 'Milestone deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;