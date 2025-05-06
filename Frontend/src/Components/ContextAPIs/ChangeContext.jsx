import { createContext, useContext, useState } from "react";

export const ChangeContext = createContext();

export const ChangeProvider = ({ children }) => {
  const [isChangeActive, setIsChangeActive] = useState(true)
  const [isChangeGranted, setIsChangeGranted] = useState(true)
  const [isChangeExpired, setIsChangeExpired] = useState(true)

  const [loading, setLoading] = useState(false);
  const [activeMeals, setActiveMeals] = useState([]);
  const [grantedMeals, setGrantedMeals] = useState([]);
  const [blacklistMeals, setBlacklistMeals] = useState([]);

  return (
    <ChangeContext.Provider
      value={{ 
        isChangeActive,
        setIsChangeActive,
        isChangeGranted,
        setIsChangeGranted,
        isChangeExpired,
        setIsChangeExpired, 
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
    isChangeActive: changeConsumer.isChangeActive,
    setIsChangeActive: changeConsumer.setIsChangeActive,
    isChangeGranted: changeConsumer.isChangeGranted,
    setIsChangeGranted: changeConsumer.setIsChangeGranted,
    isChangeExpired: changeConsumer.isChangeExpired,
    setIsChangeExpired: changeConsumer.setIsChangeExpired,
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
