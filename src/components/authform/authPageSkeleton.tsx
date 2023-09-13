import React, { PropsWithChildren } from "react";
import { IChildrenProp } from "@/interface/childrenProps.interface";
import Link from "next/link";

type callingUrlType = "login" | "staff-login" | "signup" | "otp-login";

interface IProps {
  children: IChildrenProp | JSX.Element;
  title: string;
  callingUrl: callingUrlType;
}

const AuthPageSkeleton: React.FC<PropsWithChildren<IProps>> = ({
  children,
  title,
  callingUrl,
}) => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh_-_4rem)]">
      <div className="w-3/4 sm:w-1/2 md:w-2/5 xl:w-1/3 2xl:w-1/4 3xl:w-1/5 text-sm">
        <h1 className="mb-10 text-center text-lg sm:text-xl lg:text-[2rem] xl:text-3xl gradient_text font-bold py-2">
          {title}
        </h1>
        <div className="shadow-md dark:shadow-slate-600 rounded-md p-4 bg-gray-50 dark:bg-gray-800">
          {children}
          <nav className="pt-2">
            {callingUrl === "login" ? (
              <p className="mt-2 flex items-center">
                Login as&nbsp;
                <Link
                  href="/login?role_type=staff"
                  className="text-blue-500 underline"
                >
                  staff
                </Link>
              </p>
            ) : null}
            {callingUrl === "staff-login" ? (
              <p className="mt-2 flex items-center">
                Login as&nbsp;
                <Link href="/login" className="text-blue-500 underline">
                  consumer
                </Link>
              </p>
            ) : null}
            {callingUrl === "login" ||
            callingUrl === "staff-login" ||
            callingUrl === "otp-login" ? (
              <p className="mt-2 flex items-center">
                Don&apos;t have an account?&nbsp;
                <Link href="/signup" className="text-blue-500 underline">
                  Signup
                </Link>
              </p>
            ) : null}

            {callingUrl === "otp-login" ? (
              <p className="mt-2 flex items-center">
                Login as&nbsp;
                <Link
                  href="/login?role_type=staff"
                  className="text-blue-500 underline"
                >
                  staff
                </Link>
                &nbsp; or&nbsp;
                <Link href="/login" className="text-blue-500 underline">
                  consumer
                </Link>
              </p>
            ) : null}

            {callingUrl === "signup" ? (
              <p className="mt-2 flex items-center">
                Already have an account? Login as&nbsp;
                <Link
                  href="/login?role_type=staff"
                  className="text-blue-500 underline"
                >
                  staff
                </Link>
                &nbsp; or&nbsp;
                <Link href="/login" className="text-blue-500 underline">
                  consumer
                </Link>
              </p>
            ) : null}

            {callingUrl === "otp-login" ? null : (
              <>
                <p className="mt-2 flex items-center">
                  <Link
                    href="/login-using-otp"
                    className="text-blue-500 underline"
                  >
                    Forget password
                  </Link>
                </p>
                <p className="mt-2 flex items-center">
                  <Link
                    href="/login-using-otp"
                    className="text-blue-500 underline"
                  >
                    Login using otp
                  </Link>
                </p>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AuthPageSkeleton;
