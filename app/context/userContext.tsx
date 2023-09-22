'use client'
import { createContext, useState } from "react";
import { User } from "../../models/User";

export const UserContext = createContext<any>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userState, setUserState] = useState<User>({} as User);
  return (
    <UserContext.Provider value={{userState, setUserState}}>
      {children}
    </UserContext.Provider>
  );
};
