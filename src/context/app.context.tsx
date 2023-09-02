"use client";

import React from "react";
import { createContext, Dispatch, SetStateAction } from "react";

interface IChildrenProp {
  children: React.ReactNode;
}

interface IAppContext {
  userId: number;
  setUserId: Dispatch<SetStateAction<number>>;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>>;
  userRole: string;
  setUserRole: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<IAppContext>({
  userId: 0,
  setUserId: (): number => 0,
  userName: "",
  setUserName: () => "",
  userEmail: "",
  setUserEmail: () => "",
  userRole: "",
  setUserRole: () => "",
});
