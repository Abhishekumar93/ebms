"use client";

class FlashMessage {
  hideMessage = () => {
    let flash_message_div = document?.getElementById(
      "flash_message_div"
    ) as Element;

    if (flash_message_div && flash_message_div.children[0] !== undefined) {
      setTimeout(function () {
        flash_message_div.children[0].classList.add("flash_message_animation");
      }, 5000);
      setTimeout(function () {
        flash_message_div.innerHTML = "";
      }, 5750);
    }
  };
  successErrorMessageDiv = (type: string, message: string) => {
    let flash_message_div = document?.getElementById("flash_message_div");
    if (flash_message_div) {
      if (type === "success") {
        flash_message_div.innerHTML =
          '<div class="flash_message bg-green-200 text-green-900">' +
          message +
          "</div>";
      } else {
        flash_message_div.innerHTML =
          '<div class="flash_message bg-red-200 text-red-900">' +
          message +
          "</div>";
      }
      this.hideMessage();
    }
  };
  showSuccessMessage = (message: string) => {
    this.successErrorMessageDiv("success", message);
  };
  showErrorMessage = (message: string) => {
    this.successErrorMessageDiv("error", message);
  };
}

const flashMessage = new FlashMessage();

export default flashMessage;
