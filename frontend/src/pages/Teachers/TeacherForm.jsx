import React, { useState } from 'react';
import axios from 'axios';
import './TeacherForm.css'
const TeacherForm = ({ url }) => {
    const [formData, setFormData] = useState({
        name: '',
        field: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${url}/teachers/add`, formData);
            alert('Teacher added successfully!');
            setFormData({ name: '', field: '' });
        } catch (error) {
            console.log('Error adding teacher',error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="teacher-form">
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

export default TeacherForm;
