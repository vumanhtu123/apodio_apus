import React, { createContext, useState, ReactNode } from 'react';

const ButtonContext = createContext({ buttonPosition: { x: 0, y: 0 }, updateButtonPosition: () => {} });

export const ButtonProvider = ({ children }: { children: ReactNode }) => {
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const updateButtonPosition = ({ position }: { position: { x: number; y: number; }}) => {
    setButtonPosition(position);
  };

  return (
    <ButtonContext.Provider value={{ buttonPosition, updateButtonPosition }}>
      {children}
    </ButtonContext.Provider>
  );
};

export const useButton = () => {
  return React.useContext(ButtonContext);
};