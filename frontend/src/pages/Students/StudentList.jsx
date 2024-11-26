import React, { useState } from 'react';
import './StudentList.css';
import { useProject } from '../../context/ProjectContext';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const StudentList = () => {
    const { teachers, students } = useProject();
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [sorted, setSorted] = useState(students);

    const handlePrint = () => {
        window.print();
    };

    const handleExportToExcel = () => {
        if(sorted.length === 0){
            alert('No students to export');
            return;
        }
        const filteredStudents = sorted.map(({ name, rollNumber, projectName, branch, assignedTeacher,createdAt }) => ({
            Name: name,
            "Roll Number": rollNumber,
            Project: projectName,
            Branch: branch,
            "Assigned Teacher": assignedTeacher,
            "Created At":createdAt
        }));

        const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'students.xlsx');
    };

    const handleSort = (e) => {
        const teacherName = e.target.value;
        setSelectedTeacher(teacherName);

        if (teacherName === '') {
            // Reset to show all students
            setSorted(students);
        } else {
            // Filter students based on the selected teacher
            const sortedStudents = students.filter((student) => student.assignedTeacher === teacherName);
            setSorted(sortedStudents);
        }
    };

    return (
        <div className="student-list">
            <h2>Student List</h2>
            <div className="filter-container">
                <label htmlFor="teacherFilter">Filter by Teacher:</label>
                <select id="teacherFilter" value={selectedTeacher} onChange={handleSort}>
                    <option value="">All</option>
                    {teachers.map((teacher) => (
                        <option key={teacher._id} value={teacher.name}>
                            {teacher.name}
                        </option>
                    ))}
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Roll Number</th>
                        <th>Project</th>
                        <th>Branch</th>
                        <th>Assigned Teacher</th>
                    </tr>
                </thead>
                {sorted.length === 0 && <p className='info'>No Students Added</p>}
                <tbody>
                    {sorted.map((student) => (
                        <tr key={student.rollNumber}>
                            <td>{student.name}</td>
                            <td>{student.rollNumber}</td>
                            <td>{student.projectName}</td>
                            <td>{student.branch}</td>
                            <td>{student.assignedTeacher}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <div className="actions">
                <button onClick={handlePrint}>Print</button>
                <button onClick={handleExportToExcel}>Export to Excel</button>
            </div>
        </div>
    );
};

export default StudentList;
