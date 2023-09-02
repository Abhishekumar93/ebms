"use client";

import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Homepage() {
  const userData = useSelector((state: RootState) => {
    return state.user.name;
  });

  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (userData) setUserName(userData.split(" ")[0]);
  }, [userData]);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        <h1 className="text-6xl gradient_text font-bold scale-[1.75]">
          {`Welcome Back ${userName}!`}
        </h1>
        <h2 className="pt-12 text-2xl dark:text-slate-100">
          You have successfully logged back in.
        </h2>
      </div>
    </div>
  );
}
