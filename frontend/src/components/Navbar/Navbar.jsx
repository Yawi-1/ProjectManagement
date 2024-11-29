import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../context/AuthContext';
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);  

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);  
    };

    // const {admin} = useAuth();
        return (
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">Project Manager</Link>
                    
                    <div className="navbar-toggle" onClick={toggleMenu}>
                        <RxHamburgerMenu size={28}/>
                    </div>
                    
                  
                    <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                        <Link onClick={toggleMenu} to="/teachers"><li>Teachers</li></Link>
                        <Link onClick={toggleMenu} to="/students"><li>Students</li></Link>
                        <Link onClick={toggleMenu} to="/add-student"><li>Add Student</li></Link>
                        <Link onClick={toggleMenu} to="/adminLogin"><li>Admin</li></Link>
                    </ul>
                </div>
            </nav>
        );
    };
    

  

export default Navbar;
