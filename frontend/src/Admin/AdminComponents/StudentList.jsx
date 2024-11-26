import React from "react";
import "./StudentList.css";

const StudentList = () => {
  const students = [
    { name: "John Doe", rollNumber: "12345", branch: "CSE" },
    { name: "Jane Smith", rollNumber: "12346", branch: "ECE" },
  ];

  return (
    <div className="student-list">
      <h2>Students</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Branch</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
              <td>{student.branch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
