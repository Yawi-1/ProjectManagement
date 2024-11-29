import React, { useState } from 'react';
import './AddAdmin.css';

const AddAdmin = ({ setAddAdmin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <button type="submit">Add Admin</button>
        <button style={{
          backgroundColor: "yellow",
          color:"black"
        }} onClick={() => setAddAdmin(false)}>View all admins</button>
      </form>
    </div>
  );
};

export default AddAdmin;
