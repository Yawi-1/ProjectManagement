import React from "react";
import "./TeacherList.css";

const TeacherList = () => {
  const teachers = [
    { name: "Dr. A", field: "Mathematics" },
    { name: "Prof. B", field: "Physics" },
  ];

  return (
    <div className="teacher-list">
      <h2>Teachers</h2>
      <ul>
        {teachers.map((teacher, index) => (
          <li key={index}>
            {teacher.name} - {teacher.field}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
