import { ApiResponse } from "apisauce"
import { Api } from "../base-api/api"
import { getGeneralApiProblem } from "./api-problem"
import { hideLoading, showLoading } from "../../utils/toast"
import { CounterResult, DataDetailPaymentOrderResult, DeleteCounterResult, DeleteNotiCountResult, DetailWithdrawResResult, HistoryResult, NotificationResult, NumberUnreadResult, OrderDetailResult, OrderResult, TransactionStaffResult } from "./api.types.order"
import { ApiEndpoint } from "../base-api/api_endpoint"

export class OderApi {
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
      if (response.data.data) {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }


  async getOrders(): Promise<any> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/orders",
      )
      const data = response.data
      if (response.data.data) {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }
 
  async getOrderMerchant(dateFrom: any, dateTo: any): Promise<OrderResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/orders",
        {
          "created-at-from": dateFrom,
          "created-at-to": dateTo,
          page: 0,
          size: 50,
        },
      )
      // console.log("response", response.data)
      const data = response.data
      if (response.data.message == "Success") {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", response: e }
    }
  }

  async getPromotions(): Promise<any> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/promotion-service/api/v1/mobile/campaign-promotion/merchants",
      )
      const data = response.data

      console.log("Datae", data.message);

      if (data.message === 'success.') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async currentMerchant(): Promise<any> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/merchants/current",
      )
      const data = response.data
      if (data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async getTransationHistory(
    createdAtFrom: string,
    createdAtTo: string,
    page: number,
    size: number,
    types: string
  ): Promise<HistoryResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/transactions/transaction-withdrawal", {
        'created-at-from': createdAtFrom,
        'created-at-to': createdAtTo,
        page,
        size,
        types
      }
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data", response: e }
    }
  }

  async getTransationHistoryStaff(
    createdAtFrom: string,
    createdAtTo: string,
    page: number,
    size: number,
  ): Promise<TransactionStaffResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/transactions", {
        'created-at-from': createdAtFrom,
        'created-at-to': createdAtTo,
        page,
        size,
      }
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data" , response : e}
    }
  }

  async getOrderDetail(
    orderUUID: string,
    isLoading?: boolean

  ): Promise<OrderDetailResult> {
    if (isLoading) {
      console.log("LOading====");

      showLoading()
    } else {
      hideLoading()
    }
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/orders/" + orderUUID,
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data", response: e }
    }
  }

  async getTransationDetail(
    transactionUUID: string,
  ): Promise<DataDetailPaymentOrderResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/transactions/" + transactionUUID,
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data", response: e }
    }
  }

  async getInvoice(
    orderUUID: string,
  ): Promise<any> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "services/merchant-service/merchant-service/mobile/merchant/public/api/v1/orders/" + orderUUID + "/invoice",
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async getDetailWithDrawal(
    transactionId: string,
  ): Promise<DetailWithdrawResResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "services/merchant-service/merchant-service/mobile/merchant/public/api/v1/transactions/withdrawal/" + transactionId,
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data", response: null }
    }
  }

  async getUserNotifications(
    page: number,
    size: number,
    product?: string
  ): Promise<NotificationResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "services/notification-service/api/v1/notification/users", {
        page,
        size,
        product
      }
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data", response: e }
    }
  }

  async getUserNotificationsUnread(): Promise<NumberUnreadResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "services/notification-service/api/v1/notification/users/number-unread", {}
      )
      const data = response.data

      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data", response: e }
    }
  }

  async deleteNotifyCount(): Promise<DeleteNotiCountResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        "services/notification-service/api/v1/notification/users", {}
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data", response: e }
    }
  }

  async getCountUnRead(): Promise<CounterResult> {
    // showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "services/notification-service/api/v1/notification/users/counters", {}
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data", response: e }
    }
  }

  async delateCountUnRead(): Promise<DeleteCounterResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.delete(
        "services/notification-service/api/v1/notification/users/counters", {}
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data", response: e }
    }
  }

  async putMarkRead(id: any): Promise<any> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        "services/notification-service/api/v1/notification/users/" + id, {}
      )
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }
}
