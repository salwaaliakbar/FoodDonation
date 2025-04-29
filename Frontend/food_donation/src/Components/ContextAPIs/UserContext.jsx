import { createContext, useContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children })=>{
    const [user,setUser] = useState({})
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useData = () =>{
    const data = useContext(UserContext)
    return {user: data.user, setUser: data.setUser}
}
