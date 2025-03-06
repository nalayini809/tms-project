import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const LearningTasks = () => {
  const [learningTasks, setLearningTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resource, setResource] = useState("");
  const [video, setVideo] = useState("");
  const [quiz, setQuiz] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const navigate = useNavigate();
  const isAdmin = JSON.parse(localStorage.getItem("user"))?.role === "admin";

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("learningTasks")) || [];
    setLearningTasks(storedTasks);
  }, []);

  const handleAddOrUpdateTask = () => {
    if (!title || !description || !resource || !video || !quiz || !deadline) {
      alert("Fill all fields!");
      return;
    }

    setIsSubmitting(true);

    if (editingTask) {
      const updatedTasks = learningTasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, title, description, resource, video, quiz, deadline }
          : task
      );
      setLearningTasks(updatedTasks);
      localStorage.setItem("learningTasks", JSON.stringify(updatedTasks));
      setEditingTask(null);
    } else {
      const newTask = {
        id: Date.now(),
        title,
        description,
        resource,
        video,
        quiz,
        deadline,
        progress: 0,
      };
      const updatedTasks = [...learningTasks, newTask];
      setLearningTasks(updatedTasks);
      localStorage.setItem("learningTasks", JSON.stringify(updatedTasks));
    }

    setTitle("");
    setDescription("");
    setResource("");
    setVideo("");
    setQuiz("");
    setDeadline("");

    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setResource(task.resource);
    setVideo(task.video);
    setQuiz(task.quiz);
    setDeadline(task.deadline);
    setEditingTask(task);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = learningTasks.filter((task) => task.id !== taskId);
    setLearningTasks(updatedTasks);
    localStorage.setItem("learningTasks", JSON.stringify(updatedTasks));
  };

  return (
    <Background>
      <Container>
        {isAdmin && (
          <Form>
            <h2>{editingTask ? "Edit Learning Task ✏️" : "Create Learning Task 📝"}</h2>
            <InputGroup>
              <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <TextArea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <Input type="text" placeholder="Resource Link" value={resource} onChange={(e) => setResource(e.target.value)} />
              <Input type="text" placeholder="Video Link (Embed URL)" value={video} onChange={(e) => setVideo(e.target.value)} />
              <Input type="text" placeholder="Quiz Link" value={quiz} onChange={(e) => setQuiz(e.target.value)} />
              <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </InputGroup>
            <Button onClick={handleAddOrUpdateTask} disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : editingTask ? "Update Task" : "Add Task"}
            </Button>
          </Form>
        )}

        <Section>
          <h2>📚 Available Learning Topics</h2>
          {learningTasks.length === 0 ? (
            <NoTasks>No tasks available.</NoTasks>
          ) : (
            <TaskList>
              {learningTasks.map((task) => (
                <TaskItem key={task.id}>
                  <TaskInfo onClick={() => navigate(`/learning/${task.id}`)}>
                    <strong>{task.title}</strong>
                    <span>Deadline: {task.deadline}</span>
                  </TaskInfo>
                  {isAdmin && (
                    <Actions>
                      <EditButton onClick={() => handleEdit(task)}>✏️</EditButton>
                      <DeleteButton onClick={() => handleDelete(task.id)}>🗑️</DeleteButton>
                    </Actions>
                  )}
                </TaskItem>
              ))}
            </TaskList>
          )}
        </Section>
      </Container>
    </Background>
  );
};


const Background = styled.div`
  background: url("https://c0.wallpaperflare.com/preview/134/372/59/abstract-background-copyspace-brainstorm.jpg") center/cover no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const NoTasks = styled.p`
  text-align: center;
  font-size: 16px;
  color: #777;
  margin-top: 10px;
`;

const Container = styled.div`
  padding: 30px;
  max-width: 800px;
  width: 100%;
  background: rgba(236, 208, 208, 0.95);
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Form = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: 0.3s;
  &:focus {
    transform: scale(1.02);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: #0056b3;
    transform: scale(1.05);
  }
`;

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  animation: ${slideIn} 0.5s ease-in-out;
`;

const EditButton = styled.button`
  background: #ffcc00;
  padding: 5px 10px;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
`;

const Section = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteButton = styled.button`
  background: #ff4444;
  padding: 5px 10px;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

export default LearningTasks;
