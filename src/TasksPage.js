import React, { useState } from "react";
import styled from "styled-components";

const TasksPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete React Project", category: "Work" },
    { id: 2, title: "Review Assessment Submissions", category: "Assessments" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Work");

  // Function to Add Task
  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: tasks.length + 1,
      title: newTask,
      category: selectedCategory,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask(""); // Clear input field
  };

  // Function to Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContainer>
      <h1>📌 Manage Tasks</h1>

      {/* Task Input Section */}
      <TaskInputSection>
        <TaskInput
          type="text"
          placeholder="Enter new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        
        <TaskSelect onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Assessments">Assessments</option>
          <option value="Learning">Learning</option>
        </TaskSelect>
        
        <AddTaskButton onClick={addTask}>Add Task</AddTaskButton>
      </TaskInputSection>

      {/* Task List */}
      <TaskList>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id}>
              <TaskTitle>{task.title}</TaskTitle>
              <TaskCategory>{task.category}</TaskCategory>
              <DeleteButton onClick={() => deleteTask(task.id)}>❌</DeleteButton>
            </TaskCard>
          ))
        ) : (
          <NoTasks>No tasks available. Add a new task!</NoTasks>
        )}
      </TaskList>
    </TaskContainer>
  );
};

// Styled Components
const TaskContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const TaskInputSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const TaskInput = styled.input`
  padding: 10px;
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TaskSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AddTaskButton = styled.button`
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const TaskList = styled.div`
  margin-top: 20px;
`;

const TaskCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const TaskTitle = styled.span`
  font-weight: bold;
`;

const TaskCategory = styled.span`
  font-size: 14px;
  color: gray;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 18px;
  cursor: pointer;
`;

const NoTasks = styled.p`
  color: gray;
`;

export default TasksPage;
