'use client'
import React, { createContext, useState } from "react";
import { Patient } from "../../models/Patient";
import { Bed } from "../../models/Room";

export const PatientContext = createContext<any>(null);

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patientState, setPatientState] = useState<Patient>({} as Patient);
  return (
    <PatientContext.Provider value={{patientState, setPatientState}}>
      {children}
    </PatientContext.Provider>
  );
};
