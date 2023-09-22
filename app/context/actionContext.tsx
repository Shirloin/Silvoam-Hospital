'use client'
import React, { createContext, useState } from "react";

export const MyContext = createContext<any>(null);

export const ActionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [actionState, setActionState] = useState("");
  return (
    <MyContext.Provider value={{actionState, setActionState}}>
      {children}
    </MyContext.Provider>
  );
};
