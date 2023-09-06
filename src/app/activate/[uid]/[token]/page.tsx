import axios from "axios";
import Link from "next/link";
import type { Metadata } from "next";
import flashMessage from "@/components/flashmessage/flashMessage";
import { getApi } from "@/utils/restApi.utils";

export const metadata: Metadata = {
  title: "Activate Account | EBMS",
};

const ActivateAccount = async ({
  params,
}: {
  params: { uid: string; token: string };
}) => {
  const verifyAndActivateAccount = async (uid: string, token: string) => {
    try {
      let response = await getApi(`activate/${uid}/${token}/`);
      return response.data["message"];
    } catch (error) {
      flashMessage.showErrorMessage("Something went wrong! Please try again.");
    }
  };

  const data = await verifyAndActivateAccount(params.uid, params.token);

  const accountVerifiedAndActivated = () => {
    return (
      <>
        <h1 className="dark:text-green-500 text-green-600">
          Account Activation Success!!!
        </h1>
        <h2 className="dark:text-green-500 text-green-600 mb-2">
          Thanks for confirming your account
        </h2>
        <h3 className="dark:text-green-500 text-green-600">
          You can now{" "}
          <Link
            href="/login"
            className="dark:text-blue-500 text-blue-600 underline"
          >
            login
          </Link>{" "}
          to your account.
        </h3>
      </>
    );
  };

  const accountVerifiedAndNotActivated = () => {
    return (
      <>
        <h1 className="text-red-600 dark:text-red-500">
          Account Activation Failed!!!
        </h1>
        <h2 className="text-red-600 dark:text-red-500">
          It seems your token has expired or is invalid.
        </h2>
      </>
    );
  };

  const accountVerifying = () => {
    return (
      <>
        <h1>Please Wait...</h1>
        <h2>We are verifying your email address.</h2>
      </>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh_-_4rem)]">
      <div className="text-center">
        {data !== undefined
          ? data === "activation_failed"
            ? accountVerifiedAndNotActivated()
            : accountVerifiedAndActivated()
          : accountVerifying()}
      </div>
    </div>
  );
};

export default ActivateAccount;
