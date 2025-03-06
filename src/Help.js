import React from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #3b82f6, #9333ea);
  color: white;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
`;

const Content = styled.div`
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const HelpImage = styled.img`
  height: 400px; /* Adjust the height as needed */
  border-radius: 10px;
  margin-left: 40px;
`;

const Help = () => {
  return (
    <Container>
      <Content>
        <Title>Help & FAQs</Title>
        <Paragraph>
          Need assistance? We’re here to help! Check out our FAQs or reach out to our support team for further assistance.
        </Paragraph>
        <Paragraph>
          <strong>Q: How do I add a task?</strong> <br />
          A: Click on the "Add Task" button and fill in the necessary details.
        </Paragraph>
        <Paragraph>
          <strong>Q: How do I set reminders?</strong> <br />
          A: While adding a task, enable the "Reminder" option and set a time.
        </Paragraph>
        <Paragraph>
          <strong>Q: How do I share a task with my team?</strong> <br />
          A: Click on the task, then select "Share" and enter your team member's email.
        </Paragraph>
      </Content>
      <HelpImage
        src="https://www.thetilt.com/wp-content/uploads/2023/02/Full-tilt-image-e1675698202326.jpg"
        alt="Task Management"
      />
    </Container>
  );
};

export default Help;
