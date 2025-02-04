import express from 'express'; // Import express
import Child from '../components/Children.js'; // Import Child model
import MedicalRecord from '../components/MedicalRecords.js'; // Import MedicalRecord model
import Milestone from '../components/Milestone.js'; // Import Milestone model
import Vaccine from '../components/Vaccines.js'; // Import Vaccine model

const router = express.Router(); // Initialize express router

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
        const child = await Child.findById(req.params.id);
        if (!child) return res.status(404).json({ message: 'Child not found' });
        res.status(200).json(child);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Create a new child
router.post('/', async (req, res) => {
    console.log('Received Data:', req.body);

    try {
        const { firstName, lastName, birthdate, gender } = req.body;

        if (!firstName || !lastName || !birthdate || !gender) {
            console.log('Validation Error: Missing fields');
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newChild = new Child({ firstName, lastName, birthdate, gender });
        await newChild.save();

        res.status(201).json(newChild);
    } catch (error) {
        console.error('Error adding child:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT: Update a child by ID
router.put('/:id', async (req, res) => {
    const { firstName, lastName, birthdate, gender, parentId } = req.body;

    try {
        const updatedChild = await Child.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, birthdate, gender, parentId },
            { new: true, runValidators: true }
        );
        if (!updatedChild) return res.status(404).json({ message: 'Child not found' });
        res.status(200).json(updatedChild);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Delete a child by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedChild = await Child.findByIdAndDelete(req.params.id);
        if (!deletedChild) return res.status(404).json({ message: 'Child not found' });
        res.status(200).json({ message: 'Child deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add medical record log
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

// Add milestone log


// Add vaccine log



export default router;