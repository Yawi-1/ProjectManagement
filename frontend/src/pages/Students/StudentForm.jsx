import React, { useState } from 'react';
import axios from 'axios';
import './StudentForm.css';
import { useProject } from '../../context/ProjectContext';
import { Link } from 'react-router-dom';

const StudentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        branch: '',
        projectName: '',
        assignedTeacherId: '',
    });
    const { teachers, fetchStudents, url } = useProject();
    
    const [errorMessage, setErrorMessage] = useState(''); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();
        if(formData.rollNumber.length < 6){
            setErrorMessage('Enter a valid roll number.');
            return;
        }
        try {
            const { data } = await axios.post(`${url}/students/add`, formData);
            fetchStudents();
            alert(data.message);
            setFormData({
                name: '',
                rollNumber: '',
                branch: '',
                projectName: '',
                assignedTeacherId: '',
            });
            setErrorMessage(''); 
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'An error occurred');
            } else {
                setErrorMessage('An error occurred');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="student-form">
            <h1>Enter the details:</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message here */}
            <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                name="rollNumber"
                placeholder="Roll Number"
                value={formData.rollNumber}
                onChange={handleChange}
                required
            />
            <input
                name="branch"
                placeholder="Branch"
                value={formData.branch}
                onChange={handleChange}
                required
            />
            <input
                name="projectName"
                placeholder="Project Name"
                value={formData.projectName}
                onChange={handleChange}
                required
            />
            <select
                name="assignedTeacherId"
                value={formData.assignedTeacherId}
                onChange={handleChange}
                required
            >
                <option value="" disabled>Select a Teacher</option>
                {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                        {teacher.name} ({teacher.field})
                    </option>
                ))}
            </select>
            <button type="submit">Add Student</button>
            <Link to='/students'>
            <button id='viewStudentbtn' type="submit">All Students</button>
            </Link>
        </form>
    );
};

export default StudentForm;
