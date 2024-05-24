import { Api } from "./api";
import { ApiResponse } from "apisauce";
import { LoginResult } from "./api.types";
import { getGeneralApiProblem } from "./api-problem";
import * as Types from "./api.types";
import { hideLoading, showLoading } from "../../utils/toast";
import { getAccessToken } from "../../utils/storage";
import { AccountInfor, AccountInforResult } from "./api.types.home";
import {
  CheckPhoneMerchantResult,
  GetOtpForgotPassResult,
  InforMerchantResult,
  MerchantGetOtpSetNewPinResult,
  SetNewPassForgotResult,
  StaffInforResult,
} from "./api.types.account";
import { ApiEndpoint } from "./api_endpoint";
import DeviceInfo from "react-native-device-info";

export class AccountApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async checkPhoneNumber(
    phoneNumber: string,
    type: string,
    identity: string
  ): Promise<CheckPhoneMerchantResult> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/public-api/mobile/merchant/v1/merchant/forgot-password",
        {
          phoneNumber,
          type,
          identity,
        }
      );
      const data = response.data;
      // if (!response.ok) {
      //   const problem = getGeneralApiProblem(response)
      //   if (problem) return problem
      // }
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      if (response.data.message === "An error occurred, please try again") {
        return { kind: "bad-data", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data", response: e };
    }
  }

  async getOtpNewPass(
    phone: any,
    userId: any
  ): Promise<GetOtpForgotPassResult> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/public-api/mobile/merchant/v1/opts",
        {
          phone,
          userId,
        }
      );
      console.log("response", response.data);
      const data = response.data;
      // if (!response.ok) {
      //   const problem = getGeneralApiProblem(response)
      //   if (problem) return problem
      // }
      if (response.data.message == "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data", response: e };
    }
  }

  async merchantSubmitNewPass(
    otp: any,
    newPassword: any,
    session: any,
    userId: any
  ): Promise<SetNewPassForgotResult> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/public-api/mobile/merchant/v1/opts/verify",
        {
          otp,
          newPassword,
          session,
          userId,
        }
      );
      const data = response.data;
      // if (!response.ok) {
      //   const problem = getGeneralApiProblem(response)
      //   if (problem) return problem
      // }
      if (response.data.message == "Success") {
        return { kind: "ok", response: data };
      } else {
        return { kind: "bad-data", response: data };
      }
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data", response: e };
    }
  }

  async checkPhoneNumberStaff(
    phoneNumber: string
  ): Promise<CheckPhoneMerchantResult> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/public-api/mobile/merchant/v1/staffs/forgot-password",
        {
          phoneNumber,
        }
      );
      const data = response.data;
      // if (!response.ok) {
      //   const problem = getGeneralApiProblem(response)
      //   if (problem) return problem
      // }
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      if (response.data.message === "An error occurred, please try again") {
        return { kind: "bad-data", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      hideLoading();
      return { kind: "bad-data", response: e };
    }
  }

  async getAccountInfo(userId): Promise<AccountInforResult> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/uaa/api/v1/user",
        {
          userId,
        }
      );
      hideLoading();
      const result = response.data;
      return { kind: "ok", result };
    } catch (e) {
      hideLoading();
      return { kind: "bad-data", result: e };
    }
  }

  async upLoadImg(params): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/uaa/api/v1/user/upload-user-image",
        params,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      hideLoading();
      const result = response.data;
      return { kind: "ok", result };
    } catch (e) {
      hideLoading();
      return { kind: "bad-data" };
    }
  }

  async merchantCheckPIN(): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/merchants/check-pin",
        {}
      );
      console.log(this.api.apisauce.headers);
      const data = response.data;
      if (data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);

      return { kind: "bad-data" };
    }
  }

  async merchantGetOTP(): Promise<MerchantGetOtpSetNewPinResult> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/wallets/otp",
        {}
      );
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      if (response.data.message === "An error occurred, please try again") {
        return { kind: "bad-data", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data", response: e };
    }
  }

  async merchantRegisterPIN(
    newPin: any,
    otp: any
  ): Promise<CheckPhoneMerchantResult> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/merchants/register-pin",
        {
          newPin,
          otp,
        }
      );
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      if (response.data.message === "An error occurred, please try again") {
        return { kind: "bad-data", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data", response: e };
    }
  }
  async getInfoMerchant(): Promise<InforMerchantResult> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/merchants/merchant",
        {}
      );
      console.log("response", response.data);
      const data = response.data;
      // if (!response.ok) {
      //   const problem = getGeneralApiProblem(response)
      //   if (problem) return problem
      // }
      if (response.data.message == "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data", response: e };
    }
  }

  async uploadAVT(formData): Promise<any> {
    showLoading();
    const token = await getAccessToken();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/uaa/api/v1/user/upload-user-image",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: `Bearer ${token.substring(1, token.length - 1)}`,
          },
        }
      );
      const result = response;
      hideLoading();
      return { kind: "ok", result };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data" };
    }
  }

  async updateUserAVT(id: any, imageUrl: any): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        "/services/uaa/api/v1/user",
        {
          id,
          imageUrl,
        }
      );
      const result = response;
      hideLoading();
      return { kind: "ok", result };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data" };
    }
  }

  async getInfoStaff(): Promise<StaffInforResult> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/staffs/staff",
        {}
      );
      console.log("response", response.data);
      const data = response.data;
      // if (!response.ok) {
      //   const problem = getGeneralApiProblem(response)
      //   if (problem) return problem
      // }
      if (response.data.message == "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data", response: e };
    }
  }
}
