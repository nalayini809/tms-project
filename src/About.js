import React from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #3b82f6, #9333ea);
  color: white;
  padding: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  max-width: 800px;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const About = () => {
  return (
    <Container>
      <Content>
        
        <Title>About Us</Title>
        <Paragraph>
          Our Task Management System is designed to help individuals and teams
          plan, track, and execute their tasks efficiently. We focus on
          productivity, organization, and collaboration to make work easier and
          more effective.
        </Paragraph>
        <Paragraph>
          With our smart scheduling, progress tracking, and reminder features,
          managing your workflow has never been easier.
        </Paragraph>
        <Image
          src="https://img.freepik.com/free-vector/teamwork-concept-landing-page_52683-20165.jpg"
          alt="About Us"
        />
      </Content>
    </Container>
  );
};

export default About;
