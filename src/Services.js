import React from "react";
import styled from "styled-components";
import { FaTasks, FaClock, FaUsers, FaListAlt, FaBell } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to right, #3b82f6, #9333ea);
  color: white;
  padding: 40px;
`;

const Content = styled.div`
  flex: 1;
  max-width: 50%;
  text-align: left;
  padding-right: 40px;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const List = styled.ul`
  font-size: 18px;
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 20px;
`;

const ServiceImage = styled.img`
  flex: 1;
  max-width: 50%;
  border-radius: 10px;
`;

const Services = () => {
  return (
    <Container>
      <Content>
        <Title>Our Services</Title>
        <List>
          <ListItem><FaTasks /> Smart Task Scheduling</ListItem>
          <ListItem><FaClock /> Task Prioritization & Progress Tracking</ListItem>
          <ListItem><FaBell /> Recurring Tasks & Automated Reminders</ListItem>
          <ListItem><FaUsers /> Team Collaboration & Task Sharing</ListItem>
          <ListItem><FaListAlt /> Task Categories & Organization</ListItem>
        </List>
      </Content>
      <ServiceImage src="https://5.imimg.com/data5/SELLER/Default/2023/7/323039989/AR/JI/JQ/121044696/task-management-software-services-500x500.png" alt="Task Management" height="600px" />
    </Container>
  );
};

export default Services;