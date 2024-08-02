import { Api } from "../base-api/api";
import { ApiResponse } from "apisauce";
import { getGeneralApiProblem } from "./api-problem";
import { getAccessToken } from "../../utils/storage";
import { ApiEndpoint } from "../base-api/api_endpoint";
import DeviceInfo from "react-native-device-info";
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../../app-purchase/components/dialog-notification";

export class AccountApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async checkPhoneNumber(
    phoneNumber: string,
    type: string,
    identity: string,
  ): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
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
      Loading.hide();
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      if (response.data.message === "An error occurred, please try again") {
        return { kind: "bad-data", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data", response: e };
    }
  }

  async getOtpNewPass(
    phone: any,
    userId: any
  ): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
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
      Loading.hide();
      if (response.data.message == "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data", response: e };
    }
  }

  async merchantSubmitNewPass(
    otp: any,
    newPassword: any,
    session: any,
    userId: any
  ): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
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
      Loading.hide();
      if (response.data.message == "Success") {
        return { kind: "ok", response: data };
      } else {
        return { kind: "bad-data", response: data };
      }
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data", response: e };
    }
  }

  async checkPhoneNumberStaff(
    phoneNumber: string
  ): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
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
      Loading.hide();
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      if (response.data.message === "An error occurred, please try again") {
        return { kind: "bad-data", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data", response: e };
    }
  }

  async getAccountInfo(userId): Promise<AccountInforResult> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/uaa/api/v1/user",
        {
          userId,
        }
      );
      Loading.hide();
      const result = response.data;
      return { kind: "ok", result };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data", result: e };
    }
  }

  async upLoadImg(params: any): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/uaa/api/v1/user/upload-user-image",
        params,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      Loading.hide();
      const result = response.data;
      return { kind: "ok", result };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }

  async merchantCheckPIN(): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/merchants/check-pin",
        {}
      );
      console.log(this.api.apisauce.headers);
      const data = response.data;
      Loading.hide();
      if (data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      Loading.hide();
      return { kind: "bad-data" };
    }
  }

  async merchantGetOTP(): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/wallets/otp",
        {}
      );
      Loading.hide();
      const data = response.data;
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      if (response.data.message === "An error occurred, please try again") {
        return { kind: "bad-data", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data", response: e };
    }
  }

  async merchantRegisterPIN(
    newPin: any,
    otp: any
  ): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/merchants/register-pin",
        {
          newPin,
          otp,
        }
      );
      Loading.hide();
      const data = response.data;
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      if (response.data.message === "An error occurred, please try again") {
        return { kind: "bad-data", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data", response: e };
    }
  }
  async getInfoMerchant(): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/merchants/merchant",
        {}
      );
      Loading.hide();
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
      Loading.hide();
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data", response: e };
    }
  }

  async uploadAVT(formData: any): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
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
      Loading.hide();
      return { kind: "ok", result };
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data" };
    }
  }

  async updateUserAVT(id: any, imageUrl: any): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        "/services/uaa/api/v1/user",
        {
          id,
          imageUrl,
        }
      );
      const result = response;
      Loading.hide();
      return { kind: "ok", result };
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data" };
    }
  }

  async getInfoStaff(): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
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
      Loading.hide();
      if (response.data.message == "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data", response: e };
    }
  }
}
