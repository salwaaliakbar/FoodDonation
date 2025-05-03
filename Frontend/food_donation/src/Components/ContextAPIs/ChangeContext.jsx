import { createContext, useContext, useState } from "react";

export const ChangeContext = createContext();

export const ChangeProvider = ({ children }) => {
  const [isChange, setIsChange] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeMeals, setActiveMeals] = useState([]);
  const [grantedMeals, setGrantedMeals] = useState([]);
  const [blacklistMeals, setBlacklistMeals] = useState([]);

  return (
    <ChangeContext.Provider
      value={{ 
        isChange, 
        setIsChange, 
        loading, 
        setLoading, 
        activeMeals, 
        setActiveMeals, 
        grantedMeals, 
        setGrantedMeals, 
        blacklistMeals, 
        setBlacklistMeals }}
    >
      {children}
    </ChangeContext.Provider>
  );
};

export const useChange = () => {
  const changeConsumer = useContext(ChangeContext);
  return {
    isChange: changeConsumer.isChange,
    setIsChange: changeConsumer.setIsChange,
    loading: changeConsumer.loading,
    setLoading: changeConsumer.setLoading,
    activeMeals: changeConsumer.activeMeals,
    setActiveMeals: changeConsumer.setActiveMeals,
    grantedMeals: changeConsumer.grantedMeals,
    setGrantedMeals: changeConsumer.setGrantedMeals,
    blacklistMeals: changeConsumer.blacklistMeals,
    setBlacklistMeals: changeConsumer.setBlacklistMeals
  };
};
