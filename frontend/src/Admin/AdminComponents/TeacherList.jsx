import React from 'react';

import { useProject } from '../../context/ProjectContext';
const TeacherList = () => {
    const {teachers} = useProject();

    return (
        <div className="teacher-list">
            <h2>Teacher List</h2>
            
            <ul>
                <li id='header'>Name  <span>Field</span></li>
                {teachers.length === 0 ? <p>No Teacher Added..</p>:teachers?.map((teacher) => (
                    <li key={teacher._id}>
                        {teacher.name} <span>{teacher.field}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherList;
