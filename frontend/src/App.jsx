import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import TeacherList from './pages/Teachers/TeacherList'
import TeacherForm from './pages/Teachers/TeacherForm';
import StudentList from './pages/Students/StudentList';
import StudentForm from './pages/Students/StudentForm';
import HomePage from './pages/Home/HomePage';
import './App.css'
import AdminHome from './components/Admin/AdminHome';

const App = () => {
    const backendUrl = "http://localhost:3000";

    return (
        <Router>
            <Navbar />
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/teachers" element={<TeacherList />} />
                    <Route path="/students" element={<StudentList  />} />
                    {/* <Route path="/add-teacher" element={<TeacherForm url={backendUrl} />} /> */}
                    <Route path="/add-student" element={<StudentForm  />} />
                    <Route path="/adminLogin" element={<AdminHome  />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
