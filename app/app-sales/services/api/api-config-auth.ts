import { id } from "date-fns/locale";
import { Api } from "../base-api/api";
import { ApiResponse } from "apisauce";
import { ApiEndpoint } from "../base-api/api_endpoint";
import {
  ALERT_TYPE,
  Dialog,
  Toast,
  Loading,
} from "../../../components/dialog-notification";
import { GetWayAPI } from "../base-api/api-config-get-way";
import DeviceInfo from "react-native-device-info";
import { getGeneralApiProblem } from "./api-problem";
import { UAA_API } from "../base-api/api-config-uaa";
import { LoginResponse } from "../../models/login-model";

export class AuthApi {
  private getway: GetWayAPI;
  private uaa: UAA_API;

  constructor(getway: GetWayAPI, uaa: UAA_API) {
    this.getway = getway;
    this.uaa = uaa;
  }
  async login(username: string, password: string): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<BaseResponse<LoginResponse, ErrorCode>> =
        await this.getway.apisauce.post(ApiEndpoint.SIGN_IN, {
          username,
          password,
          deviceInfo: DeviceInfo.getUniqueIdSync() + 2,
        });
      Loading.hide();
      console.log("response", response.data);
      const data = response.data;
      // if (!response.ok) {
      //   // hideLoading()
      //   const problem = getGeneralApiProblem(response);
      //   if (problem) return problem;
      // }
      // if (response.data.message == "Success") {
      //   // hideLoading()
      //   return { kind: "ok", LoginModelResult: data };
      // }
      // return { kind: "bad-data", LoginModelResult: data };
      return data;
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }

  async logout(jti: string): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.getway.apisauce.post(
        ApiEndpoint.LOG_OUT,
        {
          jti,
          deviceInfo: DeviceInfo.getUniqueIdSync() + 2,
        }
      );
      Loading.hide();
      console.log("response", response.data);
      const data = response.data;
      // if (!response.ok) {
      //   // hideLoading()
      //   const problem = getGeneralApiProblem(response);
      //   if (problem) return problem;
      // }
      // if (response.data.message == "Success") {
      //   // hideLoading()
      //   return { kind: "ok", LoginModelResult: data };
      // }
      // return { kind: "bad-data", LoginModelResult: data };
      return { kind: "ok", data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }

  async forgotPass(otpReceiver: string, receiverType: string): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.uaa.apisauce.post(
        ApiEndpoint.FORGOT_PASSWORD,
        {
          otpReceiver,
          receiverType,
        }
      );
      console.log("response", response.data);
      const data = response.data;
      // if (!response.ok) {
      Loading.hide();
      //   const problem = getGeneralApiProblem(response);
      //   if (problem) return problem;
      // }
      // if (response.data.message == "Success") {
      //   // hideLoading()
      //   return { kind: "ok", LoginModelResult: data };
      // }
      // return { kind: "bad-data", LoginModelResult: data };
      return { kind: "ok", data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }

  async submitChange(oldPassword: string, newPassword: string): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<BaseResponse<any, ErrorCode>> =
        await this.uaa.apisauce.put(ApiEndpoint.PUT_CHANGE_PASS, {
          oldPassword,
          newPassword,
        });
      Loading.hide();
      console.log("response", response.data);
      const data = response.data;
      return { kind: "ok", data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }

  async getOtpForgotPass(
    otpReceiver: string,
    receiverType: string
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.uaa.apisauce.post(
        ApiEndpoint.GENERATE_OTP,
        {
          otpReceiver,
          receiverType,
        }
      );
      console.log("response", response.data);
      const data = response.data;
      // if (!response.ok) {
      Loading.hide();
      //   const problem = getGeneralApiProblem(response);
      //   if (problem) return problem;
      // }
      // if (response.data.message == "Success") {
      //   // hideLoading()
      //   return { kind: "ok", LoginModelResult: data };
      // }
      // return { kind: "bad-data", LoginModelResult: data };
      return { kind: "ok", data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }

  async submitPassword(otp: number, newPassword: string): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<BaseResponse<any, ErrorCode>> =
        await this.uaa.apisauce.post(ApiEndpoint.POST_SUBMIT_PASSWORD, {
          otp,
          newPassword,
        });
      Loading.hide();
      console.log("response", response.data);
      const data = response.data;
      return data;
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async refreshToken(refreshToken: string): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<BaseResponse<LoginResponse, ErrorCode>> =
        await this.getway.apisauce.post(ApiEndpoint.REFRESH_TOKEN, {
          refreshToken,
          branchId: 0,
          deviceInfo: DeviceInfo.getUniqueIdSync() + 2,
        });
      Loading.hide();
      console.log("response", response.data);
      const data = response.data;
      // if (!response.ok) {
      //   // hideLoading()
      //   const problem = getGeneralApiProblem(response);
      //   if (problem) return problem;
      // }
      // if (response.data.message == "Success") {
      //   // hideLoading()
      //   return { kind: "ok", LoginModelResult: data };
      // }
      // return { kind: "bad-data", LoginModelResult: data };
      return data;
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
}
