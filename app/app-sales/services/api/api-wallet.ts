import { ApiResponse } from "apisauce"
import { Api } from "../base-api/api"
import { getGeneralApiProblem } from "./api-problem"
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../../app-purchase/components/dialog-notification";

export class WalletApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }
  async createNewOder(
    orderCode: string,
    contents: string,
    originalPrice: any,
  ): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/orders",
        {
          orderCode,
          contents,
          originalPrice,
        },
      )
      Loading.hide();
      const data = response.data
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }

      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getListResend(search?: any, loading?: boolean): Promise<any> {
    if (loading) {
      Loading.show({
        text: 'Loading...',
      });
    } else {
      Loading.hide();
    }

    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/transfer-to-bank",
        { search },
      )
      Loading.hide();
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" , response: e }
    }
  }

  async merchantWithdrawFee(amount: any, type: string): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/wallets/fee",
        {
          amount,
          type
        },
      )
      Loading.hide();
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", response: e }
    }
  }
  async merchantPINVerify(pinCode: any): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/wallets/pin/verify",
        {
          pinCode
        },
      )
      Loading.hide();
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", response: e }
    }
  }
  async merchantChangePIN(oldPin: any, newPin: any): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/root-accounts/pin",
        {
          oldPin,
          newPin
        },
      )
      Loading.hide();
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", response: e }
    }
  }
  async merchantChangePass(oldPassword: any, newPassword: any): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/root-accounts/change-password",
        {
          oldPassword,
          newPassword
        },
      )
      Loading.hide();
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", response: e }
    }
  }
  async staffChangePass(oldPassword: any, newPassword: any): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/staffs/change-password",
        {
          oldPassword,
          newPassword
        },
      )
      Loading.hide();
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", response: e }
    }
  }
  async merchantGetOTPBank(): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/wallets/otp",
        {},
      )
      Loading.hide();
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", response: e }
    }
  }
  async checkOtp(
    bankAccountNo: number,
    currency: any,
    amount: number,
    otp: any,
    pinCode: any,
    content: string
  ): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/wallets/withdrawal/bank",
        {
          bankAccountNo,
          currency,
          amount,
          otp,
          pinCode,
          content
        },
      )
      Loading.hide();
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", response: e }
    }
  }
  async checkOtpHO(
    currency: any,
    amount: number,
    otp: any,
    pinCode: any
  ): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/wallets/withdrawal/ho",
        {
          currency,
          amount,
          otp,
          pinCode
        },
      )
      Loading.hide();
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" , response: e}
    }
  }

  async merchantWalletPostRecentBank(
    bankAccount: number,
    amount: number,

  ): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/transfer-to-bank",
        {
          bankAccount,
          amount,
        },
      )
      Loading.hide();
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
  async merchantWalletGetRecentBank(): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/transfer-to-bank",
        {},
      )
      Loading.hide();
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

}
