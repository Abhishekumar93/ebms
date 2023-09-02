import UsersList from "@/components/users/users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staffs List | EBMS",
};

export default function Staffs() {
  return <UsersList userType="Staff" />;
}
