import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskManagementApp = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState({ title: "", description: "", category: "Personal" });

  // Define fetchTasks outside useEffect so it can be called anytime
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks?search=${search}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search]); // Runs when search changes

  const handleTaskChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/tasks", { ...newTask, userId });
      setNewTask({ title: "", description: "", category: "Personal" });
      fetchTasks(); // Fetch tasks after adding new one
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const acceptTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/accept/${taskId}`, { userId });
      fetchTasks();
    } catch (error) {
      console.error("Error accepting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 animate-fadeIn">Task Management System</h1>
      <div className="w-full max-w-4xl p-6 bg-gray-700 shadow-xl rounded-xl">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 bg-gray-900 text-white"
        />
        <form onSubmit={handleTaskSubmit} className="mb-6">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={handleTaskChange}
            className="w-full p-3 border rounded-lg mb-3 bg-gray-900 text-white"
            required
          />
          <textarea
            name="description"
            placeholder="Task Description"
            value={newTask.description}
            onChange={handleTaskChange}
            className="w-full p-3 border rounded-lg mb-3 bg-gray-900 text-white"
            required
          />
          <select
            name="category"
            value={newTask.category}
            onChange={handleTaskChange}
            className="w-full p-3 border rounded-lg mb-3 bg-gray-900 text-white"
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Learning">Learning</option>
          </select>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg">
            Create Task
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tasks.length === 0 ? (
            <p className="text-center">No tasks found</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="bg-gray-800 p-6 rounded-lg shadow-md animate-slideIn">
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="text-gray-400">{task.description}</p>
                <p className="text-sm font-bold mt-2">Category: {task.category}</p>
                <button
                  onClick={() => acceptTask(task._id)}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Accept Task
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManagementApp;
