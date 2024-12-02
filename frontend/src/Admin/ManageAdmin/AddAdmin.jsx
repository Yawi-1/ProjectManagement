import React, { useState } from 'react';
import './AddAdmin.css';
import { useProject } from '../../context/ProjectContext';
import axios from 'axios';
import {toast} from 'react-toastify'
import Loader from '../../components/Loader/Loader'

const AddAdmin = ({ setAddAdmin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { url, fetchAdmins,isLoading,setIsLoading } = useProject();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true)
      const { data } = await axios.post(`${url}/admins/add`, { name, email, password });
      fetchAdmins();
      toast(data.message);
      setName('');
      setEmail('');
      setPassword('');
    }
    catch (error) {
      toast(error.response.data.message);
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="addadmin-container">

      <h2>Add New Admin</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter admin name"
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter admin email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
        <button type="submit">Add Admin</button>
        <button style={{
          backgroundColor: "yellow",
          color: "black"
        }} onClick={() => setAddAdmin(false)}>View all admins</button>
      </form>
            {isLoading && <Loader/>}
    </div>
  );
};

export default AddAdmin;
