"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import AuthPageSkeleton from "../authform/authPageSkeleton";
import Image from "next/image";
import { IUserLogin } from "@/interface/user.interface";
import { OverlayLoading } from "../overlayLoading/overlayLoading";
import authApi from "@/utils/authApi.utils";
import { useDispatch } from "react-redux";
import { addUserDetail } from "@/store/slices/userSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const isStaff = searchParams.get("role_type");

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isLoginBtnActive, setIsLoginBtnActive] =
    React.useState<boolean>(false);
  const [userDetails, setUserDetails] = React.useState<IUserLogin>({
    email: "",
    password: "",
    staff_id: "",
  });
  const [isRedirectToDashboard, setIsRedirectToDashboard] =
    React.useState<boolean>(false);

  useEffect(() => {
    let { email, password, staff_id } = userDetails;
    if (
      email.trim() !== "" &&
      password.trim() !== "" &&
      ((isStaff && staff_id?.trim() !== "") || !isStaff)
    ) {
      setIsLoginBtnActive(true);
    } else {
      setIsLoginBtnActive(false);
    }
  }, [userDetails, isStaff]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setUserDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleTogglePasswordVisibility = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowPassword((prevState) => !prevState);
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoginBtnActive(false);
    let data = { ...userDetails };
    if (!isStaff) {
      data.staff_id = "";
    }
    let result = await authApi.getTokenKey(data);

    if (result) {
      setIsRedirectToDashboard(true);
      dispatch(addUserDetail(result));
    } else {
      setIsRedirectToDashboard(false);
    }
    setIsLoginBtnActive(true);
  };

  return (
    <>
      {isRedirectToDashboard && (
        <OverlayLoading loadingText="Redirecting To Dashboard" />
      )}
      <AuthPageSkeleton
        title={`Login To ${isStaff === "staff" ? "Staff" : "Consumer"} Portal`}
        callingUrl={isStaff === "staff" ? "staff-login" : "login"}
      >
        <form onSubmit={handleFormSubmit}>
          <section>
            <label className="block text-lg">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form_input"
              value={userDetails.email}
              onChange={handleChange}
              required
            />
          </section>
          <section className="mt-5">
            <label className="block text-lg">Password</label>
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                id="password"
                className="form_input"
                value={userDetails.password}
                onChange={handleChange}
                required
              />
              <Image
                src={`/svg/eye${!showPassword ? "" : "-slash"}.svg`}
                alt={`${!showPassword ? "show" : "hide"} password`}
                className="absolute right-2 top-[43%] cursor-pointer"
                width={15}
                height={15}
                onClick={handleTogglePasswordVisibility}
              />
            </div>
          </section>
          {isStaff === "staff" && (
            <section className="mt-5">
              <label className="block text-lg">Staff Id</label>
              <input
                type="text"
                name="staff_id"
                id="staff_id"
                className="form_input"
                value={userDetails.staff_id}
                onChange={handleChange}
                required
              />
            </section>
          )}
          <button
            type="submit"
            className={`mt-7 global_button ${
              isLoginBtnActive ? "active_button" : "inactive_button"
            }`}
          >
            Login
          </button>
        </form>
      </AuthPageSkeleton>
    </>
  );
}
