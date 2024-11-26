const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin')

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

        // Generate JWT
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ admin, token, message: "Admin created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in signup route" });
    }
});

// Login Route
router.post('/verify', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const comparePassword = admin.password === password ? true:false;
           if(!comparePassword){
            return res.status(401).json({ message: "Invalid password" });
           }
        // Generate JWT
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ admin, token, message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in login route" });
    }
});

// Get all admins...........
router.get('/allAdmins', async (req, res) => {
    try {
        const admins = await Admin.find().select('-password');
        res.status(200).json(admins);
    } catch (error) {
        res.status(400).json('Error Occured... At getting admins.')
    }
})

module.exports = router;
