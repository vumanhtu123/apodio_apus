import { ApiResponse } from "apisauce"
import { Api } from "../base-api/api"
import { getGeneralApiProblem } from "./api-problem"
import { hideLoading, showLoading } from "../../utils/toast"
import { CheckPinResult } from "./api.types"
import { ChangePassResult, ChangePinResult, FeeResult, OtpResult, ResendBankResult, WithDrawHoResult } from "./api.types.wallet"

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
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/orders",
        {
          orderCode,
          contents,
          originalPrice,
        },
      )
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
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getListResend(search?: any, loading?: boolean): Promise<ResendBankResult> {
    if (loading) {
      showLoading()
    } else {
      hideLoading()
    }

    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/transfer-to-bank",
        { search },
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" , response: e }
    }
  }

  async merchantWithdrawFee(amount: any, type: string): Promise<FeeResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/wallets/fee",
        {
          amount,
          type
        },
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", response: e }
    }
  }
  async merchantPINVerify(pinCode: any): Promise<CheckPinResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/wallets/pin/verify",
        {
          pinCode
        },
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", response: e }
    }
  }
  async merchantChangePIN(oldPin: any, newPin: any): Promise<ChangePinResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/root-accounts/pin",
        {
          oldPin,
          newPin
        },
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", response: e }
    }
  }
  async merchantChangePass(oldPassword: any, newPassword: any): Promise<ChangePassResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/root-accounts/change-password",
        {
          oldPassword,
          newPassword
        },
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", response: e }
    }
  }
  async staffChangePass(oldPassword: any, newPassword: any): Promise<ChangePassResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/staffs/change-password",
        {
          oldPassword,
          newPassword
        },
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", response: e }
    }
  }
  async merchantGetOTPBank(): Promise<OtpResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/wallets/otp",
        {},
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
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
  ): Promise<WithDrawHoResult> {
    showLoading()
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
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", response: e }
    }
  }
  async checkOtpHO(
    currency: any,
    amount: number,
    otp: any,
    pinCode: any
  ): Promise<WithDrawHoResult> {
    showLoading()
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
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" , response: e}
    }
  }

  async merchantWalletPostRecentBank(
    bankAccount: number,
    amount: number,

  ): Promise<any> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/transfer-to-bank",
        {
          bankAccount,
          amount,
        },
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
  async merchantWalletGetRecentBank(): Promise<any> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/transfer-to-bank",
        {},
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      if (response.data.message === 'An error occurred, please try again') {
        return { kind: "bad-data", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

}
