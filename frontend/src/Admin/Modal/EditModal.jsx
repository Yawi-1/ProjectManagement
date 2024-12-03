import React, { useState } from 'react';
import './EditModal.css';
import axios from 'axios';
import { useProject } from '../../context/ProjectContext';
import {useAuth} from '../../context/AuthContext'
import {toast} from 'react-toastify'

const EditModal = ({ student, setIsEdit }) => {
  const {url, fetchStudents} = useProject();
  const {admin} = useAuth();
  const { _id } = student;
  const [formData, setFormData] = useState({
    name: student?.name,
    branch: student?.branch,
    year: student?.year,
    projectName: student?.projectName,
    rollNo: student?.rollNumber,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.name.trim() === "" || formData.branch.trim() === "" || formData.projectName.trim() === "") {
        toast('Enter all details correctly......');
        return;
      }
      const { data } = await axios.put(`${url}/students/${_id}`, formData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization' :`Bearer ${admin}`
          },
      });
      toast(`${data.name} is succesfully updated.....`)
      fetchStudents();
      setIsEdit(false);
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <div className="editModal">
      <div className="editModalInner">
        <h2>Update Details</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Roll No (Read-Only)
            <input type="text" value={formData.rollNo} readOnly />
          </label>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Branch
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Year
            <input type="text" name="year" value={formData.year} onChange={handleInputChange} />
          </label>
          <label>
            Project Name
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              required
            />
          </label>
          <div className="modalButtons">
            <button type="submit" className="save">Save</button>
            <button type="button" className="cancel" onClick={() => setIsEdit(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
