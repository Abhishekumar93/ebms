"use client";

import React, { useEffect } from "react";
import AuthPageSkeleton from "../authform/authPageSkeleton";
import { IUserData } from "@/interface/user.interface";
import Image from "next/image";
import authApi from "@/utils/authApi.utils";

export default function SignupForm() {
  const [isSignupBtnActive, setIsSignupBtnActive] =
    React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const [userDetails, setUserDetails] = React.useState<IUserData>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    consumer_number: "",
    is_staff: false,
    staff_id: "",
  });

  useEffect(() => {
    let {
      email,
      password,
      first_name,
      last_name,
      consumer_number,
      is_staff,
      staff_id,
    } = userDetails;
    if (
      email.trim() !== "" &&
      password.trim() !== "" &&
      first_name.trim() !== "" &&
      last_name.trim() !== "" &&
      ((is_staff && staff_id?.trim() !== "") ||
        (!is_staff && consumer_number?.trim() !== ""))
    ) {
      setIsSignupBtnActive(true);
    } else {
      setIsSignupBtnActive(false);
    }
  }, [userDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setUserDetails((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === "is_staff" ? !prevState.is_staff : e.target.value,
    }));
  };
  const handleTogglePasswordVisibility = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowPassword((prevState) => !prevState);
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSignupBtnActive(false);
    let data = { ...userDetails };
    if (data.is_staff) {
      data.consumer_number = "";
    } else {
      data.staff_id = "";
    }
    let result = await authApi.createUser(data);
    if (result) setIsSignupBtnActive(true);
  };

  return (
    <AuthPageSkeleton title="Welcome To EBMS Portal" callingUrl="signup">
      <form onSubmit={handleFormSubmit}>
        <section className="flex items-center justify-between">
          <div className="mr-1">
            <label className="block text-lg">First Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              className="form_input"
              value={userDetails.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ml-1">
            <label className="block text-lg">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              className="form_input"
              value={userDetails.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </section>
        <section className="mt-5">
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
        {userDetails.is_staff ? (
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
        ) : (
          <section className="mt-5">
            <label className="block text-lg">Consumer Number</label>
            <input
              type="text"
              name="consumer_number"
              id="consumer_number"
              className="form_input"
              value={userDetails.consumer_number}
              onChange={handleChange}
              required
            />
          </section>
        )}

        <section className="mt-5 flex items-center">
          <input
            type="checkbox"
            name="is_staff"
            id="is_staff"
            checked={userDetails.is_staff}
            onChange={handleChange}
          />
          <p className="ml-2">Are you a staff of EBMS?</p>
        </section>
        <button
          type="submit"
          className={`mt-7 global_button ${
            isSignupBtnActive ? "active_button" : "inactive_button"
          }`}
        >
          Signup
        </button>
      </form>
    </AuthPageSkeleton>
  );
}
