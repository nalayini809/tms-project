import React, { createContext, useState, useContext } from 'react';

// Create context for authentication
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user state can be set after login

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null); // Logout by resetting user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
