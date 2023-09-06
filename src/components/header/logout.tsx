"use client";

import LogoutIcon from "../../../public/svg/logoutIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import authApi from "@/utils/authApi.utils";
import { useDispatch } from "react-redux";
import { removeUserDetail } from "@/store/slices/userSlice";
import { useState } from "react";
import { OverlayLoading } from "../overlayLoading/overlayLoading";

export const Logout = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state: RootState) => {
    return state.user.id;
  });

  const [showLoading, setShowLoading] = useState<boolean>(false);

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    let result = await authApi.logout();
    if (result) {
      setShowLoading(true);
      dispatch(removeUserDetail({}));
    }
  };

  if (showLoading) {
    return <OverlayLoading loadingText="Redirecting To Login" />;
  }

  if (isUserLoggedIn) {
    return (
      <LogoutIcon className="cursor-pointer h-6 w-6" onClick={handleLogout} />
    );
  }

  return null;
};
