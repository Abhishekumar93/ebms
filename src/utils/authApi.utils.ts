"use client";

import { USER_ROLE } from "@/constant/useRole/enum";
import { IUserData, IUserLogin, IUsersList } from "@/interface/user.interface";
import { delayRedirect } from "@/utils/delayRedirect.utils";
import {
  displayErrorFlashMessage,
  displaySuccessMessage,
} from "@/utils/displayFlashMessage.utils";
import {
  addLocalStorageData,
  clearLocalStorage,
  getLocalStorageData,
} from "@/utils/localStorage.utils";
import { getApi, postApi, putApi } from "./restApi.utils";
import { IUserDetailData } from "@/interface/reduxStore.interface";

class AuthApi {
  async createUser(userData: IUserData, params?: string) {
    try {
      let response = await postApi(
        `/portal-user/api/create/user/${params}`,
        userData
      );

      displaySuccessMessage(response.data["message"]);
      if (!params) {
        delayRedirect(`/login${userData.is_staff ? "?role_type=staff" : ""}`);
      }

      return response.data;
    } catch (error: any) {
      let error_data = error.response.data;
      let error_data_key = Object.keys(error_data)[0];
      let error_message_data = [
        {
          errorKey: "message",
          errorMessage: `An account with the given email id already exists in our system. ${
            params ? "Ask the user to" : "Please"
          } login with valid credentials`,
        },
        {
          errorKey: "consumer_number",
          errorMessage:
            "The given consumer number is attached with another user. Please check once again.",
        },
      ];
      displayErrorFlashMessage(error_data_key, error_message_data);
      return false;
    }
  }

  async getTokenKey(user: IUserLogin) {
    try {
      let response = await postApi("/api-token-auth/", user);

      let auth_token = response.data["token"];
      let result = await this.fetchUserBasicData(auth_token);
      addLocalStorageData("auth_token", auth_token);
      if (result) {
        displaySuccessMessage("Successfully logged in!");
        delayRedirect("/");
      }

      return result;
    } catch (error: any) {
      let error_data_key = error.response.data["message"];
      let error_message_data = [
        {
          errorKey: "account_not_active",
          errorMessage:
            "Your account is not active. Please activate your account to login in the platform.",
        },
        {
          errorKey: "staff_account_not_found",
          errorMessage: `We did not found any staff account with the given id ${user.staff_id}.`,
        },
        {
          errorKey: "consumer_account_not_found",
          errorMessage: `We did not found any consumer account with the given email ${user.email}.`,
        },
        {
          errorKey: "email_password_invalid",
          errorMessage: "Email or password is invalid.",
        },
        {
          errorKey: "account_not_found",
          errorMessage:
            "We did not found any account related to the given email id. Please check your email id again.",
        },
      ];
      displayErrorFlashMessage(error_data_key, error_message_data);
      return false;
    }
  }

  async fetchUserBasicData(token: string) {
    try {
      let response = await getApi("login/", {
        Authorization: `Token ${token}`,
      });
      let response_data = response.data;
      let result: IUserDetailData = {
        id: response_data.id,
        email: response_data.email,
        name: response_data.username,
        role: response_data.user_role,
      };
      return result;
    } catch (error: any) {
      displayErrorFlashMessage();
      return false;
    }
  }

  async updateUser(userData: IUsersList) {
    try {
      let response = await putApi(`user/update/${userData.id}/`, userData, {
        Authorization: `Token ${getLocalStorageData("auth_token")}`,
      });
      let response_data = response.data;
      displaySuccessMessage(
        `User ${response_data["first_name"]} successfully updated!`
      );
      return response_data;
    } catch (error: any) {
      displayErrorFlashMessage();
      return false;
    }
  }

  async generateOtp(userData: { email: string }) {
    try {
      let response = await postApi("/portal-user/api/otp/", userData);
      if (response.status === 200 && response.data["message"] === "otp_sent") {
        displaySuccessMessage(
          "We have sent an OTP on your email address. Please check your email"
        );
      }
      return true;
    } catch (error: any) {
      let error_data = error.response.data;
      let error_data_key = Object.keys(error_data)[0];
      let error_message_data = [
        {
          errorKey: "message",
          errorMessage: "Looks like you don't have an account on the platform.",
        },
      ];
      displayErrorFlashMessage(error_data_key, error_message_data);
      return false;
    }
  }

  async logout() {
    let auth_token = getLocalStorageData("auth_token");
    if (auth_token) {
      try {
        let response = await postApi(
          "/dj-rest-auth/logout/",
          {},
          { Authorization: `Token ${auth_token}` }
        );
        let response_data = response.data["detail"];
        if (response_data) {
          displaySuccessMessage(response_data);
          clearLocalStorage();
          delayRedirect("/");
          return true;
        }
        return false;
      } catch (error: any) {
        displayErrorFlashMessage();
        return false;
      }
    }
  }
}

const authApi = new AuthApi();
export default authApi;
