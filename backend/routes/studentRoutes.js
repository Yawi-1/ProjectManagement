const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Teacher = require('../models/teacher')

// Add a new student
router.post('/add', async (req, res) => {
    try {
        const {rollNumber,assignedTeacherId} = req.body;
        const isStudent = await Student.findOne({rollNumber});
        if (isStudent) {
            return res.status(400).json({message: "Roll number already used."});
        }
        const student = new Student(req.body);
        await student.save();

        // Store student in teacher array.......
        const teacher = await Teacher.findById(assignedTeacherId);
        if (!teacher) {
           return res.status(400).json({message:"Teacher not found."})
        }
            teacher.students.push(student._id);
         await teacher.save();

        res.status(201).json({ message: 'Student added successfully!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Each Student........

router.get('/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const student = await Student.findById(id);
        res.send(student);

    } catch (error) {
        res.send(error)
    }
})

// Updae a student.....
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name,projectName,branch,year } = req.body;

        // Check if student exists before attempting to update
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update student name
        student.name = name;
        student.projectName = projectName;
        student.branch=branch;
        student.year = year;

        await student.save(); // Save the updated student

        res.json(student); // Return updated student object

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
});

// Delete a student.........

router.delete('/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const student = await Student.findByIdAndDelete(id);
        res.json({message:"Student Deleted .....", name:student.name});

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server Error' });
    }
})


module.exports = router;
