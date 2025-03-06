import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const AssessmentTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("assessmentTasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("assessmentTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProcessFile = () => {
    if (!file) return alert("Please upload a file first!");
    if (!taskTitle || !taskDescription) return alert("Please enter all task details!");
    
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      deadline: deadline || "Not Specified",
      fileName: file.name,
      fileType: file.type,
      fileURL: URL.createObjectURL(file),
    };
    
    setTasks([...tasks, newTask]);
    setTaskTitle("");
    setTaskDescription("");
    setDeadline("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setDeadline(task.deadline);
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleSaveEdit = () => {
    setTasks(tasks.map(task => 
      task.id === editingTaskId 
        ? { ...task, title: taskTitle, description: taskDescription, deadline } 
        : task
    ));
    setEditingTaskId(null);
    setTaskTitle("");
    setTaskDescription("");
    setDeadline("");
  };

  return (
    <Container>
      <Overlay />
      <Content>
        <Title>Assessment Tasks 📝</Title>
        <TaskForm>
          <StyledInput 
            type="text" 
            placeholder="Enter Task Title" 
            value={taskTitle} 
            onChange={(e) => setTaskTitle(e.target.value)} 
          />
          <StyledTextArea
            placeholder="Enter Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <StyledInput type="file" accept=".json" ref={fileInputRef} onChange={handleFileUpload} />
          <StyledInput type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          {editingTaskId ? (
            <StyledButton onClick={handleSaveEdit}>Save Changes</StyledButton>
          ) : (
            <StyledButton onClick={handleProcessFile}>Upload & Process File</StyledButton>
          )}
        </TaskForm>

        <TaskList>
          {tasks.map((task) => (
            <TaskCard key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Deadline:</strong> {task.deadline}</p>
              <ButtonContainer>
                <EditButton onClick={() => handleEdit(task)}>Edit</EditButton>
                <DeleteButton onClick={() => handleDelete(task.id)}>Delete</DeleteButton>
              </ButtonContainer>
            </TaskCard>
          ))}
        </TaskList>
      </Content>
    </Container>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: url("https://img.freepik.com/free-vector/hand-drawn-colorful-science-education-wallpaper_23-2148489183.jpg?semt=ais_hybrid") no-repeat center center;
  background-size: cover;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(185, 169, 169, 0.5);
`;

const Content = styled.div`
  max-width: 600px;
  padding: 30px;
  background: rgb(245, 205, 239);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const TaskForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0px 0px 5px #4caf50;
  }
`;

const StyledTextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  min-height: 80px;
  resize: vertical;
`;

const StyledButton = styled.button`
  background: #37a79e;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #388e3c;
  }
`;
const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const TaskCard = styled.div`
  background: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  text-align: left;
  transition: 0.3s;
  animation: ${fadeIn} 0.5s ease-in-out;

  &:hover {
    transform: scale(1.02);
    background: #e0e0e0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const EditButton = styled.button`
  background: #ff9800;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #e68900;
  }
`;

const DeleteButton = styled.button`
  background: #d32f2f;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #b71c1c;
  }
`;


export default AssessmentTasks;
