import React from 'react';
import './DeleteModal.css';
import axios from 'axios';
import { useProject } from '../../context/ProjectContext';
import {useAuth} from '../../context/AuthContext'
import {toast} from 'react-toastify'

const DeleteModal = ({ setIsDelete, userData, suburl }) => {
  const { url, fetchStudents, fetchAdmins, fetchTeachers,setIsLoading } = useProject();
  const {admin} = useAuth();
  const { _id } = userData;
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(`${url}/${suburl}/${_id}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin}`
          }
      });
      toast(data.message)
      suburl === 'students' && fetchStudents()
      suburl === 'admins' && fetchAdmins();
      suburl === 'teachers' && fetchTeachers();
      setIsDelete(false);
    }
    catch (error) {
      if (error.response || error.response.data) {
        toast(error.response.data.message || 'Student not deleted ...')
        setIsDelete(false)
      }
      else {
        toast('Something went wrong')
      }
    }
    finally{
      setIsLoading(false)
    }
  }
  return (
    <div className='deleteModal'>
      <div className='deleteModalInner'>
        <p>Are you sure you want to delete this item?</p>
        <button className='yes' onClick={handleDelete}>Yes</button>
        <button className='no' onClick={() => setIsDelete(false)}>No</button>
      </div>
    </div>
  );
};

export default DeleteModal;
