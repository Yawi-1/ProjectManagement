const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const router = express.Router();

// Signup Route
router.post('/add', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        const isExist = await Admin.findOne({ email });
        if (isExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create new admin
        const admin = new Admin({ name, email, password });
        await admin.save();

        res.status(201).json({ admin, message: "Admin created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in signup route" });
    }
});

// Login Route (Store Token in HTTP-only Cookie)
router.post('/verify', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Verify password
        const comparePassword = admin.password === password ? true : false;
        if (!comparePassword) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // Generate JWT
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ admin, token, message: "Login successful, token stored in cookie" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in login route" });
    }
});

// Get all admins
router.get('/', async (req, res) => {
    try {
        const admins = await Admin.find({}).select('-password');
        res.status(200).json(admins);
    } catch (error) {
        res.status(400).json('Error occurred while getting admins.');
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Count the number of admins in the database
        const adminCount = await Admin.countDocuments();

        if (adminCount <= 1) {
            return res.status(400).json({
                message: "Cannot delete admin. At least one admin must remain."
            });
        }

        // Find and delete the admin
        const admin = await Admin.findByIdAndDelete(id);

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found."
            });
        }

        res.status(200).json({
            message: "Admin deleted successfully",
            admin: admin.name
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while deleting the admin.",
            error: error.message
        });
    }
});


module.exports = router;
