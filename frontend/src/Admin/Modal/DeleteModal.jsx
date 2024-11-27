import React from 'react';
import './DeleteModal.css';
import axios from 'axios';

const DeleteModal = ({ setIsDelete,student,url,fetchStudents }) => {
    const {_id} = student;
    const handleDelete = async()=>{
        try{
        const {data} = await axios.delete(`${url}/students/${_id}`);
        alert(data.message)
        fetchStudents();
        setIsDelete(false);
        }
        catch(error){
         if(error.response || error.response.data){
            alert(error.response.data.message || 'Student not deleted ...')
         }
         else{
            alert('Something went wrong')
         }
        }
    }
  return (
    <div className='deleteModal'>
      <div className='deleteModalInner'>
        <p>Are you sure you want to delete this item?</p>
        <button className='yes' onClick={handleDelete}>Yes</button>
        <button className='no' onClick={()=>setIsDelete(false)}>No</button>
      </div>
    </div>
  );
};

export default DeleteModal;
