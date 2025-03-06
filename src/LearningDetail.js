import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const LearningDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [progress, setProgress] = useState(0);
  const isAdmin = JSON.parse(localStorage.getItem("user"))?.role === "admin";
  const [isPosted, setIsPosted] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("learningTasks")) || [];
    const selectedTask = storedTasks.find((t) => t.id === parseInt(id));
    if (selectedTask) {
      setTask(selectedTask);
      setProgress(selectedTask.progress);
    }

    const postedTasks = JSON.parse(localStorage.getItem("postedTasks")) || [];
    setIsPosted(postedTasks.some((t) => t.id === parseInt(id)));
  }, [id]);

  const handleMarkComplete = () => {
    if (task) {
      setProgress(100);
      const updatedTasks = JSON.parse(localStorage.getItem("learningTasks")).map((t) =>
        t.id === task.id ? { ...t, progress: 100 } : t
      );
      localStorage.setItem("learningTasks", JSON.stringify(updatedTasks));
      alert("Lesson completed! ✅");
    }
  };

  const handlePostTask = () => {
    if (!task) return;

    let postedTasks = JSON.parse(localStorage.getItem("postedTasks")) || [];

    if (isPosted) {
      postedTasks = postedTasks.filter((t) => t.id !== task.id);
      alert("Task unposted successfully! ❌");
    } else {
      postedTasks.push(task);
      alert("Task posted successfully! ✅");
    }

    localStorage.setItem("postedTasks", JSON.stringify(postedTasks));
    setIsPosted(!isPosted);
  };

  if (!task) return <p>Lesson not found.</p>;

  return (
    <PageContainer>
      <Overlay />
      <Container>
        <Title>{task.title}</Title>
        <Description>{task.description}</Description>

        <Resource href={task.resource} target="_blank">📖 Read Material</Resource>

        <VideoContainer>
          <iframe src={task.video} title="Lesson Video" allowFullScreen></iframe>
        </VideoContainer>

        <Quiz href={task.quiz} target="_blank">📝 Take Quiz</Quiz>

        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>

        {isAdmin && (
          <PostButton isPosted={isPosted} onClick={handlePostTask}>
            {isPosted ? "🚫 Unpost Task" : "📢 Post Task"}
          </PostButton>
        )}
      </Container>
    </PageContainer>
  );
};


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleUp = keyframes`
  from { transform: scale(0.9); opacity: 0.7; }
  to { transform: scale(1); opacity: 1; }
`;



const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://png.pngtree.com/thumb_back/fh260/back_our/20190625/ourmid/pngtree-tmall-e-commerce-office-learning-stationery-simple-banner-image_258156.jpg') no-repeat center center fixed;
  background-size: cover;
  position: relative;
  padding: 20px;
`;


const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(219, 204, 204, 0.5);
`;

const Container = styled.div`
  width: 60%;
  max-width: 850px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-bottom: 15px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 18px;
  color: white;
  margin-bottom: 20px;
  text-align: center;
  animation: ${scaleUp} 0.8s ease-in-out;
`;

const Resource = styled.a`
  display: inline-block;
  color: #4facfe;
  font-weight: bold;
  text-decoration: none;
  margin-bottom: 15px;
  font-size: 18px;
  transition: transform 0.2s ease;

  &:hover {
    text-decoration: underline;
    transform: scale(1.1);
  }
`;

const Quiz = styled.a`
  display: inline-block;
  color: #ff4747;
  font-weight: bold;
  text-decoration: none;
  font-size: 18px;
  margin-bottom: 15px;
  transition: transform 0.2s ease;

  &:hover {
    text-decoration: underline;
    transform: scale(1.1);
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;

  iframe {
    width: 90%;
    max-width: 650px;
    height: 360px;
    border-radius: 10px;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const ProgressBar = styled.div`
  width: 90%;
  background: #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 15px;
  box-shadow: inset 0px 3px 8px rgba(0, 0, 0, 0.2);
`;

const ProgressFill = styled.div`
  height: 20px;
  background: #28a745;
  width: ${(props) => props.progress}%;
  transition: width 0.5s ease-in-out;
  border-radius: 12px;
`;

const PostButton = styled.button`
  background: ${(props) => (props.isPosted ? "#dc3545" : "#007bff")};
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${(props) => (props.isPosted ? "#b52a3a" : "#0056b3")};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default LearningDetail;
