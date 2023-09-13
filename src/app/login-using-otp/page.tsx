import LoginUsingOtpForm from "@/components/loginUsingOtp/loginUsingOtpForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Using OTP | EBMS",
};

export default function LoginUsingOtp() {
  return <LoginUsingOtpForm />;
}
