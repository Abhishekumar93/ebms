import flashMessage from "@/components/flashmessage/flashMessage";
import { IErrorData } from "@/interface/errorData.interface";

export const displayErrorFlashMessage = (
  errorDataKey?: string,
  errorDataMessage?: IErrorData[]
) => {
  let error_message = "";

  if (errorDataKey && errorDataMessage) {
    let error_message_data = errorDataMessage.filter(
      (error) => error.errorKey === errorDataKey
    );
    error_message = error_message_data[0]
      ? error_message_data[0].errorMessage
      : "";
  }
  flashMessage.showErrorMessage(
    error_message ?? "Something went wrong! Please try again."
  );
};

export const displaySuccessMessage = (message: string) => {
  flashMessage.showSuccessMessage(message);
};
