import { createContext, useState } from "react";
import { useEffect } from "react";

export const TurnsSelectContext = createContext();

const initialTurnState = {
      service: null,
      serviceName: "",      
      duration: null,
      date: "",
}

export const TurnsSelectProvider = ({ children }) => {
const [itemSelect, setItemsSelect] = useState(() => {
    const saved = localStorage.getItem("myApp_turnData");
    return saved ? JSON.parse(saved) : initialTurnState;
  });


  useEffect(() => {
    localStorage.setItem("myApp_turnData", JSON.stringify(itemSelect));
  }, [itemSelect]);

  const addService = (service,serviceName, duration) => {
    setItemsSelect((prev) => ({ ...prev, service, serviceName, duration }));
   // console.log("Service added to context:", service , "Cut timer:", cutTimer);
  };

  const getService = () => {
    return itemSelect.service;
  }

    const getCutTimer = () => {
    return itemSelect.duration;
  }

  //console.log("Current itemSelect state:", itemSelect);

  const updateTurnData = (data) => {
  setItemsSelect(prev => ({
    ...prev,
    ...data
  }));
};

const clearTurn = () => {
  setItemsSelect(initialTurnState);
  localStorage.removeItem("myApp_turnData");
};


  const value = {
    itemSelect,
    setItemsSelect,
    addService,
    getService,
    getCutTimer,
    updateTurnData,
    clearTurn
  };

  return (
    <TurnsSelectContext.Provider value={value}>
      {children}
    </TurnsSelectContext.Provider>
  );
};
