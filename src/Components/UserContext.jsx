import React,{useContext,useState,useEffect,createContext} from 'react'

export const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Holds user state
    const [chatWithUser,setchatWithUser]=React.useState(0)

    return (
      <UserContext.Provider value={{ user, setUser,chatWithUser,setchatWithUser }}>
        {children}
      </UserContext.Provider>
    );
  };

  // Custom hook for easy access to UserContext
export const useUser = () => { return useContext(UserContext)};