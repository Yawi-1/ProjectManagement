const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNumber: { type: String, required: true,unique:true },
    branch: { type: String, required: true },
    projectName: { type: String, required: true },
    assignedTeacher: { type: String, required: true },
},{
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
