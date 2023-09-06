"use client";

import { IChildrenProp } from "@/interface/childrenProps.interface";
import { RootState } from "@/store";
import { addUserDetail, removeUserDetail } from "@/store/slices/userSlice";
import {
  clearLocalStorage,
  getLocalStorageData,
} from "@/utils/localStorage.utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loading from "./loading";
import authApi from "@/utils/authApi.utils";

export const AuthComponent: React.FC<IChildrenProp> = ({
  children,
}: IChildrenProp) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [showChildren, setShowChildren] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => {
    return state.user;
  });

  useEffect(() => {
    let auth_token = getLocalStorageData("auth_token");

    if (auth_token) {
      fetchUserDetail(auth_token);
    } else {
      removeLocalData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isAuthPath =
      pathname.startsWith("/login") ||
      pathname === "/signup" ||
      pathname.startsWith("/activate");

    if (userData.id) {
      if (isAuthPath) {
        setShowChildren(false);
        router.push("/");
      } else {
        setShowChildren(true);
      }
    } else {
      if (!isAuthPath) {
        setShowChildren(false);
        router.push("/login");
      } else {
        setShowChildren(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const fetchUserDetail = async (token: string) => {
    let result = await authApi.fetchUserBasicData(token);
    if (result) {
      let isDataSame =
        result.id === userData.id &&
        result.email === userData.email &&
        result.name === userData.name &&
        result.role === userData.role;
      if (!isDataSame) {
        dispatch(addUserDetail(result));
      }
    } else {
      removeLocalData();
    }
  };
  const removeLocalData = () => {
    dispatch(removeUserDetail({}));
    clearLocalStorage();
    router.push("/login");
  };

  if (showChildren) {
    return children;
  } else {
    return <Loading />;
  }
};
