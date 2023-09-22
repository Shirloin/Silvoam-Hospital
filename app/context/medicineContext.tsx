'use client'
import React, { createContext, useState } from "react";
import { Medicine } from "../../models/Medicine";

export const MedicineContext = createContext<any>(null);

export const MedicineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [medicineState, setMedicineState] = useState<Medicine[]>([]);
  return (
    <MedicineContext.Provider value={{medicineState, setMedicineState}}>
      {children}
    </MedicineContext.Provider>
  );
};
