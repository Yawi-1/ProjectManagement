import React, { useState } from "react";
import "./AddTeacher.css";

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: "",
    field: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Teacher added: ${formData.name}, Field: ${formData.field}`);
    setFormData({ name: "", field: "" });
  };

  return (
    <div className="add-teacher">
      <h2>Add Teacher</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Teacher Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="field"
          placeholder="Field"
          value={formData.field}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Teacher</button>
      </form>
    </div>
  );
};

export default AddTeacher;
