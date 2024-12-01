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
        const teachers = await Teacher.find({});
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete the teachers;

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        if (teacher.students.length === 0) {
            await teacher.deleteOne();
            return res.status(200).json({ message: 'Teacher deleted successfully' });
        }
        return res.status(400).json({ message: 'Cannot delete teacher with assigned students' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;
