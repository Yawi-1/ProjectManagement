import React, { useState } from 'react';
import axios from 'axios';
import { useProject } from '../../context/ProjectContext';
import './AddTeacher.css'
const AddTeacher = () => {
    const [formData, setFormData] = useState({
        name: '',
        field: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

      const {url,fetchTeachers} = useProject();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${url}/teachers/add`, formData);
            fetchTeachers();
            alert('Teacher added successfully!');
            setFormData({ name: '', field: '' });
        } catch (error) {
            alert('Error adding teacher');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="teacher-form">
            <h1>Add Teacher</h1>
            <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                name="field"
                placeholder="Field"
                value={formData.field}
                onChange={handleChange}
                required
            />
            <button type="submit">Add Teacher</button>
        </form>
    );
};

export default AddTeacher;
