import SignupForm from "@/components/signup/signupForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup | EBMS",
};

export default function Login() {
  return <SignupForm />;
}
