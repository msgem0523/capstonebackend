import express from 'express';
import User from '../components/User.js';
import Child from '../components/Children.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST request to add a new user
router.post('/', async (req, res) => {
    console.log('Received Data:', req.body);

    try {
        const { name, email } = req.body;

        if (!name || !email) {
            console.log('Validation Error: Missing fields');
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newUser = new User({ name, email });
        await newUser.save();

        console.log('User added successfully:', newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT: Update a user by ID
router.put('/:id', async (req, res) => {
    const { name, email } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add a new child to a user
router.post('/:userId/children', async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName, birthdate, gender } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newChild = new Child({ firstName, lastName, birthdate, gender, parentId: userId });
        await newChild.save();

        user.children.push(newChild._id);
        await user.save();

        res.status(201).json(newChild);
    } catch (error) {
        console.error('Error adding child:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all children of a user
router.get('/:userId/children', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('children');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user.children);
    } catch (error) {
        console.error('Error fetching children:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;