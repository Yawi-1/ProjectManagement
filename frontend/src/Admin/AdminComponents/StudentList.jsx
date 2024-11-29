import React, { useState } from "react";
import { useProject } from '../../context/ProjectContext'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import DeleteModal from "../Modal/DeleteModal";
import EditModal from "../Modal/EditModal";

const StudentList = () => {
  const { students, teachers } = useProject();
  const [isDelete, setIsDelete] = useState(false);
  const [student, setStudent] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { url, fetchStudents } = useProject();

  return (
    <div className="student-list">
      <h2>Students</h2>
      {isDelete && <DeleteModal url={url} student={student} setIsDelete={setIsDelete} fetchStudents={fetchStudents} />}
      {isEdit && <EditModal url={url} student={student} setIsEdit={setIsEdit} fetchStudents={fetchStudents} />}
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
                  <button onClick={() => { setIsEdit(true), setStudent(student) }} className="editbtn" >
                    <FiEdit />
                  </button>
                </td>
                <td>
                  <button onClick={() => { setIsDelete(true), setStudent(student) }} className="deletebtn">
                    <RiDeleteBin6Line />
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
