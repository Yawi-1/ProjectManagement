import React, { useState, useEffect } from 'react';
import './StudentList.css';
import { useProject } from '../../context/ProjectContext';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import {Link} from 'react-router-dom'

const StudentList = () => {
    const { teachers, students } = useProject();
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [sorted, setSorted] = useState([]);

    useEffect(() => {
        if (students && students.length > 0) {
            setSorted(students);
        }
    }, [students]);

    const handlePrint = () => {
        window.print();
    };

    const handleExportToExcel = () => {
        if (sorted.length === 0) {
            alert('No students to export');
            return;
        }
        const filteredStudents = sorted.map(({ name, rollNumber, projectName, branch, assignedTeacherId, createdAt }) => {
            const teacher = teachers.find((teacher) => teacher._id === assignedTeacherId);
            const teacherName = teacher ? teacher.name : 'Not Assigned';

            return {
                Name: name,
                "Roll Number": rollNumber,
                Project: projectName,
                Branch: branch,
                "Assigned Teacher": teacherName,
                "Created At": createdAt,
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'students.xlsx');
    };

    const handleSort = (e) => {
        const teacherId = e.target.value; 
        setSelectedTeacher(teacherId);

        if (teacherId === '') {
            // Reset to show all students
            setSorted(students);
        } else {
            // Filter students based on the selected teacher ID
            const sortedStudents = students.filter((student) => student.assignedTeacherId === teacherId);
            setSorted(sortedStudents);
        }
    } 
    return (
        <div className="student-list">
            <h2>Student List</h2>
            <div className="filter-container">
                <label htmlFor="teacherFilter">Filter by Teacher:</label>
                <select id="teacherFilter" value={selectedTeacher} onChange={handleSort}>
                    <option value="">All</option>
                    {teachers.map((teacher) => (
                        <option key={teacher._id} value={teacher._id}>
                            {teacher.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='table-container' >
                {sorted.length === 0 && <h1>No Student Available</h1>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Roll Number</th>
                        <th>Project</th>
                        <th>Branch</th>
                        <th>Year</th>
                        <th>Assigned Teacher</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((student) => {
                        const teacher = teachers.find((teacher) => teacher._id === student.assignedTeacherId);
                        const teacherName = teacher ? teacher.name : 'Not Assigned';

                        return (
                            <tr key={student.rollNumber}>
                                <td>{student.name}</td>
                                <td>{student.rollNumber}</td>
                                <td>{student.projectName}</td>
                                <td>{student.branch}</td>
                                <td>{student.year}</td>
                                <td>{teacherName}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
            <br />
            <div className="actions">
                <Link to='/add-student'><button>Add</button></Link>
                <button onClick={handlePrint}>Print</button>
                <button onClick={handleExportToExcel}>Export to Excel</button>
            </div>
        </div>
    );
};

export default StudentList;
