import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const slideUp = keyframes`
  0% { transform: translateY(50px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;


const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('https://img.freepik.com/premium-photo/vivid-blurred-colorful-wallpaper-background_759200-9453.jpg?semt=ais_hybrid') no-repeat center center fixed;
  background-size: cover;
  animation: ${fadeIn} 1s ease-out;
`;

const Form = styled.div`
  background:url('https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2655.jpg') no-repeat center center fixed;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  animation: ${slideUp} 0.5s ease-out;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid gray;
  border-radius: 5px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #3b82f6;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid gray;
  border-radius: 5px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #3b82f6;
  }
`;

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  font-size: 18px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 100%;
  transition: background-color 0.3s;
  &:hover {
    background-color: #2563eb;
  }
  &:focus {
    outline: none;
  }
`;

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user"); 
  const navigate = useNavigate();

  
  const adminName = "Admin";
  const adminEmail = "admin@example.com";

  const handleLogin = () => {
    if (!name.trim() || !email.trim()) {
      alert("Please enter your name and email!");
      return;
    }

    if (role === "admin") {
      if (email !== adminEmail) {
        alert("Invalid admin credentials!");
        return;
      }
      localStorage.setItem("user", JSON.stringify({ name: adminName, email: adminEmail, role: "admin" }));
      navigate("/admin-dashboard"); 
    } else {
      const user = { name, email, role: "user" };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/user-dashboard"); 
    }
  };

  return (
    <Container>
      <Form>
        <h2>Login</h2>
        <Input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
        <Input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
        <Select onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </Select>
        <Button onClick={handleLogin}>Login</Button>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </Form>
    </Container>
  );
};

export default Login;
