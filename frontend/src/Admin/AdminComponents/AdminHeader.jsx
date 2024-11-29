import React,{useState} from 'react'
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminHeader = ({activeTab,setActiveTab}) => {
    const {logout} = useAuth();
  return (
     <header className="admin-header">
    <h1>Admin Panel</h1>
    <nav>
      <Link to='/'>
      <button >
        Home
      </button>
      </Link>
      <button
        className={activeTab === "students" ? "active" : ""}
        onClick={() => setActiveTab("students")}
      >
        Students
      </button>
      <button
        className={activeTab === "teachers" ? "active" : ""}
        onClick={() => setActiveTab("teachers")}
      >
        Teachers
      </button>
      <button
        className={activeTab === "addTeacher" ? "active" : ""}
        onClick={() => setActiveTab("addTeacher")}
      >
        Add Teacher
      </button>
      <button className={activeTab === "manage" ? "active" : ""}
      onClick={()=>setActiveTab("manage")}>
        Manage Admin
      </button > 
      <button onClick={logout}>
        Logout
      </button>
    </nav>
  </header>
  )
}

export default AdminHeader