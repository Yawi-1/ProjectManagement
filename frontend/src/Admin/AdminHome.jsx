import React, { useState } from "react";
import StudentList from "./AdminComponents/StudentList";
import TeacherList from "./AdminComponents/TeacherList";
import AddTeacher from "./AdminComponents/AddTeacher";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <nav>
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
