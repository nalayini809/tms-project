import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPen, FaTrash, FaSave, FaPlus } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [darkMode] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditedTask(task);
  };

  const handleEditChange = (field, value) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editedTask.id ? editedTask : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setEditingTaskId(null);
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toLocaleString() : null,
          }
        : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };
  

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundImage: `url('https://urlzs.com/dB361Z')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontFamily: "Arial, sans-serif",
        backgroundColor: darkMode ? "#1a202c" : "#f8f9fa",
        color: darkMode ? "white" : "black",
        minHeight: "100vh",
        
      }}
    >
     
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: darkMode ? "#2d3748" : "#4a5568",
          padding: "20px",
          color: "white",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{
            background: "#e53e3e",
            border: "none",
            color: "white",
            padding: "10px 15px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ marginTop: "30px" }}>
        {tasks.length === 0 ? (
          <div>
        
          <p style={{ fontSize: "25px", color: "#666" }}>No tasks yet. Let's add some!</p></div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {tasks.map((task) => (
              <li
                key={task.id}
                style={{
                  background: darkMode ? "#2d3748" : "#ffffff",
                  padding: "15px",
                  margin: "10px auto",
                  maxWidth: "400px",
                  borderRadius: "8px",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                {editingTaskId === task.id ? (
                 
                  <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
  
  <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Edit Task</h3>

  <label>Task Name:</label>
  <input
    type="text"
    value={editedTask.name}
    onChange={(e) => handleEditChange("name", e.target.value)}
    placeholder="Task Name"
    style={{
      padding: "8px",
      width: "100%",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    }}
  />

 
  <label>Notes:</label>
  <textarea
    value={editedTask.notes || ""}
    onChange={(e) => handleEditChange("notes", e.target.value)}
    placeholder="Notes"
    style={{
      padding: "8px",
      width: "100%",
      height: "80px",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    }}
  ></textarea>

 
  <label>Due Date:</label>
  <input
    type="date"
    value={editedTask.dueDate || ""}
    onChange={(e) => handleEditChange("dueDate", e.target.value)}
    style={{
      padding: "8px",
      width: "100%",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    }}
  />

 
  <label>Priority:</label>
  <select
    value={editedTask.priority || "None"}
    onChange={(e) => handleEditChange("priority", e.target.value)}
    style={{
      padding: "8px",
      width: "100%",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    }}
  >
    <option value="None">None</option>
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
  </select>

  
  <label>Attachments:</label>
  <input
    type="file"
    onChange={(e) => handleEditChange("attachments", e.target.files[0])}
    style={{
      padding: "8px",
      width: "100%",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    }}
  />

 
  <button
    onClick={handleSaveTask}
    style={{
      backgroundColor: "orange",
      color: "white",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      width: "100%",
      marginTop: "10px",
    }}
  >
    <FaSave /> Save Task
  </button>
</div>

                    ) : (
                  
                  <div>
                    <strong>{task.name}</strong>
                    <p style={{ color: "#666", fontSize: "14px" }}>Due: {task.dueDate || "No deadline"}</p>
                    <p style={{ color: task.completed ? "green" : "red", fontWeight: "bold" }}>
                      {task.completed ? "Completed" : "Pending"}
                    </p>
                    <button
                      onClick={() => toggleComplete(task.id)}
                      style={{
                        backgroundColor: task.completed ? "green" : "gray",
                        color: "white",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      {task.completed ? "Completed" : "Mark as Complete"}
                    </button>
                    <button
                      onClick={() => handleEditTask(task)}
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      <FaPen /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <button
          onClick={() => navigate("/add-task")}
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            padding: "15px 20px",
            borderRadius: "50%",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          <FaPlus />
        </button>
      </div>
    </div>
    
  );
};

export default Dashboard;
