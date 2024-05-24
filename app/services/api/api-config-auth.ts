import { Api } from "../base-api/api";
import { ApiResponse } from "apisauce";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { hideLoading, showLoading } from "../../utils/toast";
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
  async login(username: string, password: string): Promise<LoginResponse> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.getway.apisauce.post(
        ApiEndpoint.SIGN_IN,
        {
          username,
          password,
          deviceInfo: DeviceInfo.getUniqueIdSync() + 2,
        }
      );
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
      return { kind: "bad-data" };
    }
  }

  async logout(jti: string): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.getway.apisauce.post(
        ApiEndpoint.LOG_OUT,
        {
          jti,
          deviceInfo: DeviceInfo.getUniqueIdSync() + 2,
        }
      );
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
      return { kind: "bad-data" };
    }
  }

  async forgotPass(otpReceiver: string, receiverType: string): Promise<any> {
    showLoading();
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
      hideLoading();
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
      hideLoading();
      return { kind: "bad-data" };
    }
  }
}
