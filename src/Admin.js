import React, { useState } from "react";

const Admin = () => {
  const [task, setTask] = useState({ name: "", description: "", category: "" });
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("adminTasks")) || []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    if (task.name && task.category) {
      const newTasks = [...tasks, { ...task, id: Date.now() }];
      localStorage.setItem("adminTasks", JSON.stringify(newTasks));
      setTasks(newTasks);
      setTask({ name: "", description: "", category: "" });
    }
  };

  return (
    <div>
      <h2>Admin - Create Tasks</h2>
      <input type="text" name="name" placeholder="Task Name" value={task.name} onChange={handleChange} />
      <textarea name="description" placeholder="Task Description" value={task.description} onChange={handleChange} />
      <select name="category" value={task.category} onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="Learning">Learning</option>
        <option value="Work">Work</option>
        <option value="Assessments">Assessments</option>
      </select>
      <button onClick={handleAddTask}>Add Task</button>

      <h3>Task List</h3>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.name} - {t.category}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
