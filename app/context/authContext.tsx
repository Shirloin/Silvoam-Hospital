'use client'
import { createContext, useState } from "react";
import { User, UserConstructor } from "../../models/User";

export const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<User>(UserConstructor());
  return (
    <AuthContext.Provider value={{authState, setAuthState}}>
      {children}
    </AuthContext.Provider>
  );
};