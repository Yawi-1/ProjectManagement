import React from 'react';
import './HomePage.css';
import { FaUserPlus, FaTasks, FaChalkboardTeacher } from 'react-icons/fa';

const HomePage = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to the Project Management App</h1>
                <p>Effortlessly manage students, teachers, and projects in one place.</p>
            </header>

            <section className="home-about">
                <div className="card">
                    <FaUserPlus className="card-icon" />
                    <h3>Efficient Management</h3>
                    <p>
                        Add and manage students, teachers, and their projects with ease.
                    </p>
                </div>
                <div className="card">
                    <FaTasks className="card-icon" />
                    <h3>Streamlined Workflow</h3>
                    <p>
                        Organize projects and assignments to boost productivity.
                    </p>
                </div>
                <div className="card">
                    <FaChalkboardTeacher className="card-icon" />
                    <h3>Teacher Coordination</h3>
                    <p>
                        Assign teachers to students for better guidance and tracking.
                    </p>
                </div>
            </section>

            <section className="home-how-it-works">
                <h2>How It Works</h2>
                <p>Follow these steps to get started:</p>
                <div className="steps-container">
                    <div className="step">
                        <span className="step-number">1</span>
                        <p>Add teachers with their details (name, department).</p>
                    </div>
                    <div className="step">
                        <span className="step-number">2</span>
                        <p>Add students and assign them to projects and teachers.</p>
                    </div>
                    <div className="step">
                        <span className="step-number">3</span>
                        <p>Manage and view all records in dedicated lists.</p>
                    </div>
                </div>
            </section>

            <footer className="home-footer">
                <h2>Ready to Get Started?</h2>
                <button className="cta-button">Start Managing Now</button>
            </footer>
        </div>
    );
};

export default HomePage;
