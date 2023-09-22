'use client'
import { createContext, useState } from "react";
import { User } from "../../models/User";

export const DriverContext = createContext<any>(null);

export const DriverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [driverState, setDriverState] = useState<User>({} as User);
  return (
    <DriverContext.Provider value={{driverState, setDriverState}}>
      {children}
    </DriverContext.Provider>
  );
};