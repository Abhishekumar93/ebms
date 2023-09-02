"use client";

import React from "react";

import { AppContext } from "@/context/app.context";
import { IChildrenProp } from "@/interface/childrenProps.interface";

export const ContextProvider: React.FC<IChildrenProp> = ({ children }) => {
  const [userId, setUserId] = React.useState<number>(0);
  const [userName, setUserName] = React.useState<string>("");
  const [userEmail, setUserEmail] = React.useState<string>("");
  const [userRole, setUserRole] = React.useState<string>("");

  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
