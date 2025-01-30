import express from 'express';
import Vaccine from '../components/Vaccines.js';

const router = express.Router();

// GET all vaccines
router.get('/', async (req, res) => {
    try {
        const vaccines = await Vaccine.find();
        res.status(200).json(vaccines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a vaccine by ID
router.get('/:id', async (req, res) => {
    try {
        const vaccine = await Vaccine.findById(req.params.id);
        if (!vaccine) return res.status(404).json({ message: 'Vaccine not found' });
        res.status(200).json(vaccine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Create a new vaccine
router.post('/', async (req, res) => {
    const { name, ageGroup, description } = req.body;
    const newVaccine = new Vaccine({
        name,
        ageGroup,
        description,
    });

    try {
        const savedVaccine = await newVaccine.save();
        res.status(201).json(savedVaccine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT: Update a vaccine by ID
router.put('/:id', async (req, res) => {
    const { name, ageGroup, description } = req.body;

    try {
        const updatedVaccine = await Vaccine.findByIdAndUpdate(
            req.params.id,
            { name, ageGroup, description },
            { new: true, runValidators: true }
        );
        if (!updatedVaccine) return res.status(404).json({ message: 'Vaccine not found' });
        res.status(200).json(updatedVaccine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Delete a vaccine by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedVaccine = await Vaccine.findByIdAndDelete(req.params.id);
        if (!deletedVaccine) return res.status(404).json({ message: 'Vaccine not found' });
        res.status(200).json({ message: 'Vaccine deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;