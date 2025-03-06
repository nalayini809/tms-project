import React, { createContext, useContext, useState } from "react";

// Create the User Context
const UserContext = createContext();

// Custom hook to use User Context
export const useUser = () => useContext(UserContext);

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
