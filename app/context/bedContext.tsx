'use client'
import React, { createContext, useState } from "react";
import { Bed } from "../../models/Room";

export const BedContext = createContext<any>(null);

export const BedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bedState, setBedState] = useState<Bed>({} as Bed);
  return (
    <BedContext.Provider value={{bedState, setBedState}}>
      {children}
    </BedContext.Provider>
  );
};
