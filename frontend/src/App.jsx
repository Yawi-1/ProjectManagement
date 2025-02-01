import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import TeacherList from './pages/Teachers/TeacherList';
import StudentList from './pages/Students/StudentList';
import StudentForm from './pages/Students/StudentForm';
import HomePage from './pages/Home/HomePage';
import './App.css';
import AdminHome from './Admin/AdminHome';
import Login from './Admin/Authentication/Login';
import { useAuth } from './context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // State to manage authentication
  const { admin } = useAuth();
  const location = useLocation();

  // Define the routes where Navbar should be hidden
  const hideNavbarRoutes = ['/dashboard'];
  const isNavbarVisible = !hideNavbarRoutes.includes(location.pathname);

  return (
     <>
      {/* Conditionally render Navbar */}
      {isNavbarVisible && <Navbar />}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/add-student" element={<StudentForm />} />
          <Route
            path="/adminLogin"
            element={admin === null ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={admin === null ? <Login /> : <AdminHome />}
            />
            </Routes>
            <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            draggable
            pauseOnHover
            />
      </div>
   </>

  );
};

export default App;
