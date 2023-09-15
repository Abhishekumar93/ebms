"use client";

import { useEffect, useState } from "react";
import AuthPageSkeleton from "../authform/authPageSkeleton";
import Image from "next/image";
import authApi from "@/utils/authApi.utils";
import { IUserLogin } from "@/interface/user.interface";
import { useDispatch } from "react-redux";
import { addUserDetail } from "@/store/slices/userSlice";
import { OverlayLoading } from "../overlayLoading/overlayLoading";

const LoginUsingOtpForm = () => {
  const dispatch = useDispatch();

  const [isOtpBtnActive, setIsOtpBtnActive] = useState<boolean>(false);
  const [showOtpField, setShowOtpField] = useState<boolean>(false);
  const [isStaff, setIsStaff] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<IUserLogin>({
    email: "",
    password: "",
    consumer_or_staff_id: "",
  });
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [isRedirectToDashboard, setIsRedirectToDashboard] =
    useState<boolean>(false);

  useEffect(() => {
    let { email, password, consumer_or_staff_id } = userDetail;
    if (
      email.trim() !== "" &&
      (showOtpField ? password.trim() !== "" : !showOtpField) &&
      ((isStaff && consumer_or_staff_id?.trim() !== "") || !isStaff)
    ) {
      setIsOtpBtnActive(true);
    } else {
      setIsOtpBtnActive(false);
    }
  }, [userDetail, showOtpField, isStaff]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOtpBtnActive(false);
    let userData = { ...userDetail };
    if (!showOtpField) {
      let result = await authApi.generateOtp({ email: userData.email });
      if (result) setShowOtpField(true);
    } else {
      if (!isStaff) {
        userData.consumer_or_staff_id = "";
      }
      let result = await authApi.getTokenKey(userData);

      if (result) {
        setIsRedirectToDashboard(true);
        dispatch(addUserDetail(result));
      } else {
        setIsRedirectToDashboard(false);
      }
    }
    setIsOtpBtnActive(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.name === "isStaff") {
      setIsStaff((prevState) => !prevState);
    } else {
      setUserDetail((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const handleTogglePasswordVisibility = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowOtp((prevState) => !prevState);
  };

  return (
    <>
      {isRedirectToDashboard && (
        <OverlayLoading loadingText="Redirecting To Dashboard" />
      )}
      <AuthPageSkeleton
        title={`Login Using OTP ${isStaff ? "(Staff)" : ""}`}
        callingUrl="otp-login"
      >
        <form onSubmit={handleFormSubmit}>
          <section>
            <label className="block text-lg">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form_input"
              value={userDetail.email}
              onChange={handleChange}
              required
            />
          </section>
          {showOtpField ? (
            <section className="mt-5">
              <label className="block text-lg">Password</label>
              <div className="relative">
                <input
                  type={`${showOtp ? "text" : "password"}`}
                  name="password"
                  id="password"
                  className="form_input"
                  value={userDetail.password}
                  onChange={handleChange}
                  required
                />
                <Image
                  src={`/svg/eye${!showOtp ? "" : "-slash"}.svg`}
                  alt={`${!showOtp ? "show" : "hide"} password`}
                  className="absolute right-2 top-[43%] cursor-pointer"
                  width={15}
                  height={15}
                  onClick={handleTogglePasswordVisibility}
                />
              </div>
            </section>
          ) : null}
          {isStaff ? (
            <section className="mt-5">
              <label className="block text-lg">Staff Id</label>
              <input
                type="text"
                name="consumer_or_staff_id"
                id="consumer_or_staff_id"
                className="form_input"
                value={userDetail.consumer_or_staff_id}
                onChange={handleChange}
                required
              />
            </section>
          ) : null}
          <section className="mt-5 flex items-center">
            <input
              type="checkbox"
              name="isStaff"
              id="isStaff"
              checked={isStaff}
              onChange={handleChange}
            />
            <p className="ml-2">Are you a staff of EBMS?</p>
          </section>
          <button
            type="submit"
            className={`mt-7 global_button ${
              isOtpBtnActive ? "active_button" : "inactive_button"
            }`}
          >
            {showOtpField ? "Login" : "Generate OTP"}
          </button>
        </form>
      </AuthPageSkeleton>
    </>
  );
};

export default LoginUsingOtpForm;
