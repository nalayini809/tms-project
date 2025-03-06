import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const AdminResearchTasks = ({ postTask }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "AI in Modern Business",
      description: "Research AI's impact on businesses.",
      deadline: "3 Days",
      requirements: [
        "Read at least two research articles on AI in business.",
        "Summarize key findings (Minimum 300 words).",
        "Identify three industries using AI.",
        "Provide real-world examples.",
        "Answer attached admin-created questions.",
      ],
      file: null,
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    requirements: "",
    file: null,
  });

  const [editingTask, setEditingTask] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewTask({ ...newTask, [name]: name === "file" ? files[0] : value });
  };

  const addTask = () => {
    if (!newTask.title || !newTask.description || !newTask.deadline) {
      alert("Please fill in all fields!");
      return;
    }

    const task = {
      id: Date.now(),
      ...newTask,
      requirements: newTask.requirements ? newTask.requirements.split(",") : [],
    };

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", deadline: "", requirements: "", file: null });
  };

  const editTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      requirements: task.requirements.join(", "),
      file: task.file,
    });
  };

  const updateTask = () => {
    if (!newTask.title || !newTask.description || !newTask.deadline) {
      alert("Please fill in all fields!");
      return;
    }

    setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...newTask, id: editingTask.id, requirements: newTask.requirements.split(",") } : t)));
    setEditingTask(null);
    setNewTask({ title: "", description: "", deadline: "", requirements: "", file: null });
  };

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const handlePostTask = async (task) => {
    console.log("Posting Task:", task);

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        alert("Task posted successfully!");
      } else {
        alert("Failed to post the task.");
      }
    } catch (error) {
      console.error("Error posting task:", error);
    }
  };

  return (
    <Container>
      <Content>
        <h2>Admin Research Task Management</h2>
        <InputContainer>
          <input type="text" name="title" placeholder="Task Title" value={newTask.title} onChange={handleInputChange} />
          <input type="text" name="description" placeholder="Task Description" value={newTask.description} onChange={handleInputChange} />
          <input type="text" name="deadline" placeholder="Deadline (e.g., 3 Days)" value={newTask.deadline} onChange={handleInputChange} />
          <input type="text" name="requirements" placeholder="Requirements (comma-separated)" value={newTask.requirements} onChange={handleInputChange} />
          <input type="file" name="file" onChange={handleInputChange} />
          {editingTask ? <Button onClick={updateTask}>Update Task</Button> : <Button onClick={addTask}>Add Task</Button>}
        </InputContainer>

        <TaskList>
          {tasks.map((task) => (
            <TaskItem key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <strong>Deadline: {task.deadline}</strong>
              <ul>
                {task.requirements?.map((req, index) => (
                  <li key={index}>✅ {req}</li>
                ))}
              </ul>
              <ButtonContainer>
                <EditButton onClick={() => editTask(task)}>Edit</EditButton>
                <DeleteButton onClick={() => deleteTask(task.id)}>Delete</DeleteButton>
                <PostButton onClick={() => handlePostTask(task)}>Post Task</PostButton>
              </ButtonContainer>
            </TaskItem>
          ))}
        </TaskList>
      </Content>
    </Container>
  );
};

export default AdminResearchTasks;

// Styled Components
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-15px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const buttonHover = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const backgroundMotion = keyframes`
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('https://previews.123rf.com/images/thares2020/thares20202101/thares2020210100344/163330552-digital-online-education-3d-render-of-mobile-application-learning-on-phone-mobile-website.jpg') no-repeat center center/cover;
  padding: 20px;
  animation: ${backgroundMotion} 20s infinite linear alternate;
`;

const Content = styled.div`
  max-width: 700px;
  width: 100%;
  background: rgba(239, 209, 237, 0.95);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  input {
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease-in-out;
    &:focus {
      border-color: #007bff;
    }
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TaskItem = styled.div`
  background: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: left;
  animation: ${fadeIn} 0.6s ease-out;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.02);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background: #007bff;
  &:hover { background: #0056b3; }
`;

const EditButton = styled(Button)` background: #ffc107; `;
const DeleteButton = styled(Button)` background: #dc3545; `;
const PostButton = styled(Button)` background: #28a745; `;

