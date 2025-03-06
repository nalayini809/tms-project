import React from "react";
import { Link } from "react-router-dom";
import { useTaskContext } from "./TaskContext";

const Sidebar = () => {
  const { currentUser } = useTaskContext();
  
  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>Task Manager</div>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          </li>

          
          {currentUser?.role === "Admin" && (
            <>
              <li style={styles.navItem}>
                <Link to="/admin-tasks" style={styles.link}>Manage Tasks</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/admin-users" style={styles.link}>Manage Users</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/admin-reports" style={styles.link}>Reports</Link>
              </li>
            </>
          )}

          
          {currentUser?.role === "User" && (
            <>
              <li style={styles.navItem}>
                <Link to="/user-tasks" style={styles.link}>My Tasks</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/user-profile" style={styles.link}>My Profile</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    backgroundColor: "#343a40",
    color: "#fff",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "30px",
    textAlign: "center",
  },
  nav: {
    flexGrow: 1,
  },
  navList: {
    listStyleType: "none",
    padding: 0,
  },
  navItem: {
    marginBottom: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
    transition: "color 0.3s",
  },
};

export default Sidebar;
