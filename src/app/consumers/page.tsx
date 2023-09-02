import UsersList from "@/components/users/users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consumers List | EBMS",
};

export default function Consumers() {
  return <UsersList userType="Consumer" />;
}
