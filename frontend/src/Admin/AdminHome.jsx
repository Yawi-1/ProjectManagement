import React, { useState } from "react";
import StudentList from "./AdminComponents/StudentList";
import TeacherList from "./AdminComponents/TeacherList";
import AddTeacher from "./AdminComponents/AddTeacher";
import "./AdminPanel.css";
import { useAuth } from "../context/AuthContext";
import {Link} from 'react-router-dom'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("students");
  const {logout} = useAuth();

  return (
    <div className="admin-panel">
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
          <button onClick={logout}>
            Logout
          </button>
        </nav>
      </header>
      <main>
        {activeTab === "students" && <StudentList />}
        {activeTab === "teachers" && <TeacherList />}
        {activeTab === "addTeacher" && <AddTeacher />}
      </main>
    </div>
  );
};

export default AdminPanel;
