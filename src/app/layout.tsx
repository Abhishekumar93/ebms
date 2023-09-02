import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { IChildrenProp } from "@/interface/childrenProps.interface";
import { AuthComponent } from "./authComponent";
import Header from "@/components/header/header";
import { Sidebar } from "@/components/sidebar/sidebar";
import Providers from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Electricity Bill Management System (EBMS)",
  description:
    "This site is responsible for generating and checking the electricity bill of the user.",
};

export function reportWebVitals(metric: string) {
  console.log(metric);
}

export default function RootLayout({ children }: IChildrenProp) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-700 h-screen dark:text-slate-300 text-slate-700 relative`}
      >
        <Providers>
          <AuthComponent>
            <Header />
            <main className="relative md:flex md:flex-row">
              <div id="flash_message_div" />
              <Sidebar />
              <article className="w-full">{children}</article>
            </main>
          </AuthComponent>
        </Providers>
      </body>
    </html>
  );
}
