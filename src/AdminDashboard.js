import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaSignOutAlt } from "react-icons/fa"; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const username = "Admin"; 

  
  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/login"); 
  };
  


  return (
    <DashboardContainer>
      
      <Sidebar className={sidebarOpen ? "open" : "closed"}>
        {sidebarOpen && (
          <CloseMenuIcon onClick={() => setSidebarOpen(false)}>
            <FaBars />
          </CloseMenuIcon>
        )}
        <SidebarTitle>Admin Panel</SidebarTitle>

        <SidebarButton onClick={() => { navigate("/"); setSidebarOpen(false); }}>
          Dashboard
        </SidebarButton>

        <SidebarButton onClick={() => { navigate("/users"); setSidebarOpen(false); }}>
          Manage Users
        </SidebarButton>

        <SidebarButton onClick={() => { navigate("/tasks"); setSidebarOpen(false); }}>
          Tasks
        </SidebarButton>

        <SidebarButton onClick={() => { navigate("/settings"); setSidebarOpen(false); }}>
          Settings
        </SidebarButton>
      </Sidebar>

      
      <MainContent className={sidebarOpen ? "shifted" : ""}>
        
        <Navbar>
          {!sidebarOpen && (
            <MenuIcon onClick={() => setSidebarOpen(true)}>
              <FaBars />
            </MenuIcon>
          )}

          <NavTitle>Admin Dashboard</NavTitle>

        
          <NavRight>
            <UserWelcome>Welcome, {username}!</UserWelcome>
            <LogoutButton onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </LogoutButton>
          </NavRight>
        </Navbar>

       
        <DashboardContent>
          <h1>Welcome to Admin Dashboard</h1>
          <p>Select a category to manage tasks efficiently.</p>

         
          <TaskSections>
            <TaskCard className="learning" onClick={() => navigate("/learning")}>
              <h2>📘 Learning Tasks</h2>
              <p>Manage educational content and learning resources.</p>
            </TaskCard>

            <TaskCard className="assessment" onClick={() => navigate("/assessments")}>
              <h2>📝 Assessments</h2>
              <p>Review and manage user assessments and quizzes.</p>
            </TaskCard>

            <TaskCard className="research" onClick={() => navigate("/research")}>
              <h2>🔬 Research Tasks</h2>
              <p>Oversee research-based tasks and documentation.</p>
            </TaskCard>
          </TaskSections>
        </DashboardContent>
      </MainContent>
    </DashboardContainer>
  );
};



const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background: url('https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-144365.jpg?semt=ais_hybrid') 
    no-repeat center/cover fixed;
`;


const Sidebar = styled.div`
  width: 250px;
  background-color: #1e1e2f;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;

  &.open {
    transform: translateX(0);
  }
`;

const SidebarTitle = styled.h2`
  margin: 20px 0;
  text-align: center;
`;

const SidebarButton = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 15px;
  text-align: left;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #33334d;
  }
`;

const CloseMenuIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 20px;
`;


const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  transition: margin-left 0.3s ease-in-out;

  &.shifted {
    margin-left: 250px;
  }
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  position: relative;
`;


const MenuIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
`;


const NavTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
`;


const UserWelcome = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-right: 15px;
`;


const NavRight = styled.div`
  display: flex;
  align-items: center;
`;


const LogoutButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: darkred;
  }
`;


const DashboardContent = styled.div`
  text-align: center;
  color: white;
`;


const TaskSections = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;


const TaskCard = styled.div`
  width: 250px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: white;

  &.learning {
    background: linear-gradient(135deg, #3498db, #8e44ad);
  }

  &.assessment {
    background: linear-gradient(135deg, #f39c12, #e74c3c);
  }

  &.research {
    background: linear-gradient(135deg, #2ecc71, #16a085);
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

export default AdminDashboard;
