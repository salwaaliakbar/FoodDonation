import { createContext, useContext, useState } from "react";

// Create UserContext
export const UserContext = createContext();

// Provider to wrap app and provide user state
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({}); // Holds user data

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to access user data
export const useData = () => {
    const data = useContext(UserContext);
    return {
        user: data.user,
        setUser: data.setUser
    };
};
