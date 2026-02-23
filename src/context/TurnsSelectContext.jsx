import { createContext, useState } from "react";

export const TurnsSelectContext = createContext();

export const TurnsSelectProvider = ({ children }) => {
  const [itemSelect, setItemsSelect] = useState({
    service: null,
    cutTimer: 0,
    date: "",
    time: "",
    name: null,
    phone: null,
  });

  const addService = (service, cutTimer) => {
    setItemsSelect((prev) => ({ ...prev, service, cutTimer }));
    console.log("Service added to context:", service , "Cut timer:", cutTimer);
  };

  const getService = () => {
    return itemSelect.service;
  }

    const getCutTimer = () => {
    return itemSelect.cutTimer;
  }

  console.log("Current itemSelect state:", itemSelect);


  const value = {
    itemSelect,
    setItemsSelect,
    addService,
    getService,
    getCutTimer
  };

  return (
    <TurnsSelectContext.Provider value={value}>
      {children}
    </TurnsSelectContext.Provider>
  );
};
