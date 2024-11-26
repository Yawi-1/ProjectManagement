import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);  // State for menu visibility

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);  // Toggle the menu
    };

    const {admin} = useAuth();
    console.log(admin);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">Project Manager</Link>
                
                {/* Hamburger Icon */}
                <div className="navbar-toggle" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                
                {/* Links Container */}
                <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/teachers"><li>Teachers</li></Link>
                    <Link to="/students"><li>Students</li></Link>
                    <Link to="/add-student"><li>Add Student</li></Link>
                    <Link to="/adminLogin"><li>Admin</li></Link>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
