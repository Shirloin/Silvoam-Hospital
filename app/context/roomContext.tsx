'use client'
import React, { createContext, useState } from "react";
import { Room } from "../../models/Room";

export const RoomContext = createContext<any>(null);

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roomState, setRoomState] = useState<Room>({} as Room);
  return (
    <RoomContext.Provider value={{roomState, setRoomState}}>
      {children}
    </RoomContext.Provider>
  );
};
