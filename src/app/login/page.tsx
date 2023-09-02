import LoginForm from "@/components/login/loginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | EBMS",
};

export default function Login() {
  return <LoginForm />;
}
