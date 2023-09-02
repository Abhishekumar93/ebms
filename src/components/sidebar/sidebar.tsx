"use client";

import React from "react";
import HomeIcon from "@/../public/svg/homeIcon";
import ProfileIcon from "@/../public/svg/profileIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutIcon from "../../../public/svg/logoutIcon";
import authApi from "@/utils/authApi.utils";
import { useDispatch } from "react-redux";
import { removeUserDetail } from "@/store/slices/userSlice";

interface INavItems {
  title: string;
  href: string;
  component: React.ReactNode;
}
const NAV_ITEM: INavItems[] = [
  { title: "Home", href: "/", component: <HomeIcon className="h-7 w-7" /> },
  {
    title: "Consumers",
    href: "/consumers",
    component: <ProfileIcon className="h-7 w-7" />,
  },
  {
    title: "Staffs",
    href: "/staffs",
    component: <ProfileIcon className="h-7 w-7" />,
  },
  {
    title: "Logout",
    href: "/logout",
    component: <LogoutIcon className="h-7 w-7" />,
  },
];
export const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const isAuthUrl =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/login-using-otp" ||
    pathname.startsWith("/activate");

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    let result = await authApi.logout();
    if (result) dispatch(removeUserDetail({}));
  };

  const showNavItems = () => {
    return NAV_ITEM.map((item) => {
      return (
        <div
          key={`${item.title.toLowerCase()}`}
          className="flex items-center gap-x-2 group select-none mb-3"
        >
          <div className="w-1 rounded-xl h-9 bg-transparent transition-colors duration-200 relative overflow-hidden">
            <div
              className={`absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 ${
                pathname === item.href ? "translate-y-0" : "translate-y-full"
              } bg-red-600 transition-all duration-300`}
            ></div>
          </div>
          {item.title.toLowerCase() !== "logout" ? (
            <Link
              href={item.href}
              className={`flex items-center gap-x-2 w-full pl-2 rounded py-1.5 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 group-hover:shadow-red-600 group-hover:shadow-inner ${
                pathname === item.href
                  ? "bg-gray-100 dark:bg-gray-700 shadow-inner shadow-red-600"
                  : null
              }`}
            >
              {item.component}
              {item.title}
            </Link>
          ) : (
            <div
              className={`flex items-center gap-x-2 w-full pl-2 rounded py-1.5 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 group-hover:shadow-red-600 group-hover:shadow-inner cursor-pointer ${
                pathname === item.href
                  ? "bg-gray-100 dark:bg-gray-700 shadow-inner shadow-red-600"
                  : null
              }`}
              onClick={handleLogout}
            >
              {item.component}
              {item.title}
            </div>
          )}
        </div>
      );
    });
  };

  if (!isAuthUrl) {
    return (
      <aside className="sticky top-16 h-[calc(100vh_-_4rem)] py-4 pr-4 flex flex-col items-center w-72 bg-gray-200 dark:bg-gray-800 shadow-md dark:shadow-slate-600">
        <nav className="w-full">{showNavItems()}</nav>
      </aside>
    );
  }

  return null;
};
