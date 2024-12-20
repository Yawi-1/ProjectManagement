import React, { useState } from 'react';
import axios from 'axios';
import './StudentForm.css';
import { useProject } from '../../context/ProjectContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';

const StudentForm = () => {
        // Fetch the data from context......
        const { teachers, fetchStudents, url,isLoading,setIsLoading } = useProject();

    // creates a formData to get the user data through form....
    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        branch: '',
        year:'',
        projectName: '',
        assignedTeacherId: '',
    });


    // State to manage error ....
    const [errorMessage, setErrorMessage] = useState(''); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    // Add student functionality...........
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.rollNumber.length < 6){
            setErrorMessage('Enter a valid roll number.');
            return;
        }
        try {
            setIsLoading(true);
            const { data } = await axios.post(`${url}/students/add`, formData);
            fetchStudents();
            toast(data.message);
            setFormData({
                name: '',
                rollNumber: '',
                branch: '',
                year:'',
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
        finally{
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="student-form">
            {isLoading && <Loader/>}
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
            <select name="year" value={formData.year} onChange={handleChange}>
                <option value="" disabled>Select Year</option>
                <option value="Ist ">Ist Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
            </select>
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
