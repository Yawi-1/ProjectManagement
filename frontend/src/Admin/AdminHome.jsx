import React, { useState } from "react";
import StudentList from "./AdminComponents/StudentList";
import TeacherList from "./AdminComponents/TeacherList";
import AddTeacher from "./AdminComponents/AddTeacher";
import AdminHeader from "./AdminComponents/AdminHeader";
import ManageAdmin from "./ManageAdmin/ManageAdmin";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="admin-panel">
      <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab}/>
      <main>
        {activeTab === "students" && <StudentList />}
        {activeTab === "teachers" && <TeacherList />}
        {activeTab === "addTeacher" && <AddTeacher />}
        {activeTab === "manage" && <ManageAdmin />}
      </main>
    </div>
  );
};

export default AdminPanel;
