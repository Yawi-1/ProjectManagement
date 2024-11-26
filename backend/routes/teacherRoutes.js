const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');

// Add a new teacher
router.post('/add', async (req, res) => {
    try {
        const teacher = new Teacher(req.body);
        await teacher.save();
        res.status(201).json({ message: 'Teacher added successfully!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all teachers
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find()
        // .populate('subject')
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
