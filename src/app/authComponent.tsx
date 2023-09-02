"use client";

import { IChildrenProp } from "@/interface/childrenProps.interface";
import { RootState } from "@/store";
import { removeUserDetail } from "@/store/slices/userSlice";
import { clearLocalStorage } from "@/utils/localStorage.utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const AuthComponent: React.FC<IChildrenProp> = ({
  children,
}: IChildrenProp) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector((state: RootState) => {
    return state.user.id;
  });

  useEffect(() => {
    let isAuthPath =
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/login-using-otp" ||
      pathname.startsWith("/activate");

    if (isUserLoggedIn) {
      if (isAuthPath) {
        router.push("/");
      }
    } else {
      if (!isAuthPath) {
        router.push("/login");
      }
      dispatch(removeUserDetail({}));
      clearLocalStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return children;
};
