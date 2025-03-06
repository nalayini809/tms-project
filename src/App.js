import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LearningTasks from "./LearningTasks";
import LearningDetail from "./LearningDetail";
import AssessmentTasks from "./AssessmentTasks";
import ResearchTasks from "./ResearchTasks";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import About from "./About";
import ContactUs from "./ContactUs";
import Services from "./Services";
import Help from "./Help";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import AddTask from "./AddTask";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);
  

  const loadTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  };

  const handleAddTask = (newTask) => {
    newTask.id = Date.now();
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
    setTasks(storedTasks);
  };

  return (
    <Router> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard tasks={tasks} loadTasks={loadTasks} />} />
        <Route path="/dashboard" element={<Dashboard tasks={tasks} loadTasks={loadTasks} />} />
        <Route path="/add-task" element={<AddTask onAddTask={handleAddTask} />} />
        <Route path="/assessments" element={<AssessmentTasks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/help" element={<Help />} />
        <Route path="/research" element={<ResearchTasks />} />
        <Route path="/learning" element={<LearningTasks />} />
        <Route path="/learning/:id" element={<LearningDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
