import React, { useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useProject } from '../../context/ProjectContext';
import DeleteModal from '../Modal/DeleteModal';

const TeacherList = () => {

    const {teachers} = useProject();
    const [isDelete,setIsDelete] = useState(false);
    const [teacher,setTeacher] = useState(null);

    return (
        <div className="teacher-list">
            <h2>Teacher List</h2>
            {isDelete && <DeleteModal setIsDelete={setIsDelete} suburl='teachers' userData={teacher}/>}
            <ul>
                <li id='header'>Name  <span>Delete</span> <span>Field (No. of Students)</span> </li>
                {teachers.length === 0 ? <p>No Teacher Added..</p>:teachers?.map((teacher) => (
                    <li key={teacher._id}>
                        {teacher.name} 
                         <span 
                         onClick={()=>{ setIsDelete(true),setTeacher(teacher)}}
                          style={{
                            cursor: 'pointer',
                            color: 'red',
                        }} ><RiDeleteBin6Line/></span> <span>{teacher.field} ({teacher.students.length})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherList;
