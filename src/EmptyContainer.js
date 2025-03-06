import React from "react";
import styled from "styled-components";

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
`;

const Illustration = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
`;

const AddTaskButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #e63946;
  }
`;

const EmptyTaskScreen = ({ onAddTask }) => {
  return (
    <EmptyContainer>
      <Illustration src="https://cdn-icons-png.flaticon.com/512/3468/3468377.png" alt="Empty Task List" />
      <Message>A fresh list, let's get started!</Message>
      <AddTaskButton onClick={onAddTask}>+ Add Task</AddTaskButton>
    </EmptyContainer>
  );
};

export default EmptyTaskScreen;
