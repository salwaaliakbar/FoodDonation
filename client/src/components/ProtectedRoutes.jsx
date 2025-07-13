import { useData } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../Components/Loader";

function ProtectedRoutes({ children }) {
    const { user } = useData();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // If user state changes from empty to populated, stop loading
        console.log(user);
        if (user && Object.keys(user).length > 0) {
            console.log("user is set");
            setIsLoading(false);
        } else {
            // If user is empty, wait a bit then stop loading
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 500);
            
            return () => clearTimeout(timer);
        }
    }, [user]);
    
    // Show loading while waiting for user state to be set
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }
    
    // Check if user object is empty or doesn't exist
    if (!user || Object.keys(user).length === 0) {
        return <Navigate to="/loginRequired" />
    }
    
    return children;
}

export default ProtectedRoutes;