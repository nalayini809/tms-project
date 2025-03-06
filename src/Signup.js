import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background:  url('https://img.freepik.com/free-photo/fitness-concept-with-dumbbells-frame_23-2148531434.jpg');
  background-size: cover;
  background-repeat: no-repeat;
`;
const Form = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
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
  
  width: 100%;
  &:hover {
    background-color: #2563eb;
  }
`;

const Signup = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email.trim()) {
      alert("Please enter a valid email!");
      return;
    }

    
    navigate("/login");
  };

  return (
    <Container>
      <Form>
        <h2>Sign Up</h2>
        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={handleSignup}>Sign Up</Button>
      </Form>
    </Container>
  );
};

export default Signup;
