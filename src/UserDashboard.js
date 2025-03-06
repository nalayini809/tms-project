import React, { useState, useEffect } from "react";
import MyTasks from "./MyTasks";
import SearchTasks from "./SearchTasks";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaSignOutAlt } from "react-icons/fa";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("MyTasks");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user && user.name) {
          setUsername(user.name);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Invalid user data:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <DashboardLayout>
      
      <Sidebar className={sidebarOpen ? "open" : "closed"}>
        {sidebarOpen && (
          <CloseMenuIcon onClick={() => setSidebarOpen(false)}>
            <FaBars />
          </CloseMenuIcon>
        )}
        <SidebarTitle>User Panel</SidebarTitle>
        <SidebarButton onClick={() => navigate("/profile")}>Profile</SidebarButton>
        <SidebarButton onClick={() => navigate("/settings")}>Settings</SidebarButton>
      </Sidebar>

     
      <MainContent className={sidebarOpen ? "shifted" : ""}>
        
        <Navbar>
          {!sidebarOpen && (
            <MenuIcon onClick={() => setSidebarOpen(true)}>
              <FaBars />
            </MenuIcon>
          )}
          <NavbarButtons>
            <NavbarButton
              onClick={() => navigate("/dashboard")}
             
            >
              My Tasks
            </NavbarButton>
            <NavbarButton
              onClick={() => setActiveTab("SearchTasks")}
              className={activeTab === "SearchTasks" ? "active" : ""}
            >
              Search Tasks
            </NavbarButton>
          </NavbarButtons>
          <UserActions>
            <UserWelcome>Welcome, {username}!</UserWelcome>
            <LogoutButton onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </LogoutButton>
          </UserActions>
        </Navbar>

       
        <ContentContainer>
          {activeTab === "MyTasks" && <MyTasks />}
          {activeTab === "SearchTasks" && <SearchTasks />}
        </ContentContainer>
      </MainContent>
    </DashboardLayout>
  );
};


const DashboardLayout = styled.div`
  display: flex;
  height: 100vh;
  background: url('https://geekbot.com/blog/wp-content/uploads/2021/04/3_-7-hard-to-get-tips-for-effortless-task-management-in-Slack.jpg') no-repeat center center/cover;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #2d3748;
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
  text-align: center;
`;

const SidebarButton = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 15px;
  text-align: left;
  font-size: 16px;
  
  &:hover {
    background-color: #4a5568;
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
  padding: 10px 20px;
  background-color: #4a5568;
  border-radius: 8px;
  color: white;
`;

const NavbarButtons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-grow: 1; /* Ensures buttons take available space */
`;

const NavbarButton = styled.button`
  background-color: transparent;
  color: white;
  font-size: 18px;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  transition: 0.3s;

  &:hover {
    color: #fbbf24;
  }

  &.active {
    color: #fbbf24;
    border-bottom: 2px solid #fbbf24;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserWelcome = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
`;

const LogoutButton = styled.button`
  background: #e53e3e;
  border: none;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: #c53030;
  }
`;

const MenuIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  margin-right: 20px; 
`;

const ContentContainer = styled.div`
  padding: 30px;
  overflow-y: auto;
`;

export default UserDashboard;
