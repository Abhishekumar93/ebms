import Link from "next/link";
import { Logout } from "./logout";

export default function Header() {
  return (
    <header className="bg-gray-200 dark:bg-gray-800 h-16 px-2.5 flex items-center justify-between shadow-md dark:shadow-slate-600 z-40 sticky top-0 w-full">
      <Link href="/">EBMS</Link>
      <Logout />
    </header>
  );
}
