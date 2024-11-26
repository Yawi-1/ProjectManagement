import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <div className="home-header">
                <h1>Welcome to the Project Management App for Teachers</h1>
                <p>Your one-stop solution to manage students, projects, and assignments efficiently.</p>
            </div>
            
            <div className="home-content">
                <h2>About This Project</h2>
                <p>
                    This app is designed to help teachers efficiently manage student assignments, projects, and their respective teachers. 
                    It allows teachers to:
                </p>
                <ul>
                    <li>Add students with their details (name, roll number, branch, project name, and assigned teacher).</li>
                    <li>View and manage the list of students.</li>
                    <li>Assign teachers to students for better coordination.</li>
                    <li>Manage teachers' information like names and departments.</li>
                </ul>

                <h2>How It Works</h2>
                <p>
                    The app follows a simple process for managing both teachers and students:
                </p>
                <ol>
                    <li>Add a teacher by entering their name and department.</li>
                    <li>Add a student, assigning them a project, roll number, branch, and a teacher.</li>
                    <li>View all teachers and students in dedicated lists for better overview.</li>
                    <li>Quickly assign teachers to new students or modify existing records.</li>
                </ol>
                
                <h2>Features</h2>
                <ul>
                    <li>Easy-to-use form-based interface for adding teachers and students.</li>
                    <li>Fully responsive layout for both desktop and mobile use.</li>
                    <li>Real-time data management and retrieval from a backend server.</li>
                    <li>Clear and intuitive user experience to streamline teacher-student project management.</li>
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
