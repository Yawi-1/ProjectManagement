import React, { useState } from 'react';
import axios from 'axios';
import { useProject } from '../../context/ProjectContext';
import './AddTeacher.css';
import {toast} from 'react-toastify'
import Loader from '../../components/Loader/Loader';
import {useAuth} from '../../context/AuthContext'

const AddTeacher = () => {
    const {url,fetchTeachers,isLoading,setIsLoading} = useProject();
    const {admin} = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        field: '',
    });

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            await axios.post(`${url}/teachers/add`, formData,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${admin}`
                }
            });
            fetchTeachers();
            toast('Teacher added successfully!');
            setFormData({ name: '', field: '' });
        } catch (error) {
            console.log(error)
            toast('Error adding teacher');
        }
        finally{
            setIsLoading(false)
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
            {isLoading && <Loader/>}
        </form>
    );
};

export default AddTeacher;
