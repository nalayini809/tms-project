import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #ff7eb3, #ff758c);
`;

const Form = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid gray;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  font-size: 18px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  &:hover {
    background-color: #2563eb;
  }
`;

const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [priority, setPriority] = useState("none");
  const navigate = useNavigate();

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const handleSaveTask = () => {
    const task = {
      taskName,
      notes,
      attachments,
      subtasks,
      priority,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("task", JSON.stringify(task));
    navigate("/tasks");
  };

  return (
    <Container>
      <Form>
        <h2>Create Task</h2>
        <Input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <Button onClick={() => document.getElementById("fileInput").click()}>
          Add Attachment
        </Button>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setAttachments([...attachments, e.target.files[0]])}
        />
        <Button onClick={handleAddSubtask}>Add Subtask</Button>
        {subtasks.map((subtask, index) => (
          <Input
            key={index}
            type="text"
            placeholder="Subtask"
            value={subtask}
            onChange={(e) => {
              let newSubtasks = [...subtasks];
              newSubtasks[index] = e.target.value;
              setSubtasks(newSubtasks);
            }}
          />
        ))}
        <label>Priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="none">None</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <Button onClick={handleSaveTask}>Save Task</Button>
      </Form>
    </Container>
  );
};

export default TaskForm;
