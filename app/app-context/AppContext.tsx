import React, { createContext, useContext } from 'react';

type AppContextType = {
  setCurrentApp: React.Dispatch<React.SetStateAction<string>>;
};


export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};