import React from "react";
import { useProject } from '../../context/ProjectContext'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
const StudentList = () => {
  const { students, teachers } = useProject()

  return (
    <div className="student-list">
      <h2>Students</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Branch</th>
            <th>Project Name</th>
            <th>Assigned Teacher</th>
            <th> Edit</th>
            <th>Delete</th>

          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
            const teacher = teachers.find((teacher) => teacher._id === student.assignedTeacherId);
            const teacherName = teacher ? teacher.name : 'Not Assigned';
            return (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.rollNumber}</td>
                <td>{student.branch}</td>
                <td>{student.projectName}</td>
                <td>{teacherName}</td>
                <td>
                  <button  className="editbtn" >
                    <FiEdit />
                  </button>
                </td>
                <td>
                  <button className="deletebtn">
                    <RiDeleteBin6Line  />
                  </button>
                </td>
              </tr>

            )
          }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
