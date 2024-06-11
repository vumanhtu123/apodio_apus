import { ApiResponse } from "apisauce";
import { Api } from "../base-api/api";
import { getGeneralApiProblem } from "./api-problem";
import {
  ALERT_TYPE,
  Dialog,
  Toast,
  Loading,
} from "../../components/dialog-notification";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { ApiAccounting } from "../base-api/api-config-accounting";

export class OderApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async createNewOder(
    orderCode: string,
    contents: string,
    originalPrice: any
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/orders",
        {
          orderCode,
          contents,
          originalPrice,
        }
      );
      Loading.hide();
      const data = response.data;
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data" };
    }
  }

  async getOrders(): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/orders"
      );
      Loading.hide();
      const data = response.data;
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }

  async getOrderMerchant(dateFrom: any, dateTo: any): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/orders",
        {
          "created-at-from": dateFrom,
          "created-at-to": dateTo,
          page: 0,
          size: 50,
        }
      );
      Loading.hide();
      // console.log("response", response.data)
      const data = response.data;
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

  async getPromotions(): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/promotion-service/api/v1/mobile/campaign-promotion/merchants"
      );
      const data = response.data;

      console.log("Datae", data.message);
      Loading.hide();
      if (data.message === "success.") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }

  async currentMerchant(): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/merchants/current"
      );
      Loading.hide();
      const data = response.data;
      if (data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }

  async getTransationHistory(
    createdAtFrom: string,
    createdAtTo: string,
    page: number,
    size: number,
    types: string
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/transactions/transaction-withdrawal",
        {
          "created-at-from": createdAtFrom,
          "created-at-to": createdAtTo,
          page,
          size,
          types,
        }
      );
      Loading.hide();
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data", response: e };
    }
  }

  async getTransationHistoryStaff(
    createdAtFrom: string,
    createdAtTo: string,
    page: number,
    size: number
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/transactions",
        {
          "created-at-from": createdAtFrom,
          "created-at-to": createdAtTo,
          page,
          size,
        }
      );
      Loading.hide();
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data", response: e };
    }
  }

  async getOrderDetail(orderUUID: string, isLoading?: boolean): Promise<any> {
    if (isLoading) {
      console.log("LOading====");
      Loading.show({
        text: "Loading...",
      });
    } else {
      Loading.hide();
    }
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/orders/" +
          orderUUID
      );
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data", response: e };
    }
  }

  async getTransationDetail(transactionUUID: string): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/services/merchant-service/merchant-service/mobile/merchant/public/api/v1/transactions/" +
          transactionUUID
      );
      Loading.hide();
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data", response: e };
    }
  }

  async getInvoice(orderUUID: string): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "services/merchant-service/merchant-service/mobile/merchant/public/api/v1/orders/" +
          orderUUID +
          "/invoice"
      );
      Loading.hide();
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }

  async getDetailWithDrawal(transactionId: string): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "services/merchant-service/merchant-service/mobile/merchant/public/api/v1/transactions/withdrawal/" +
          transactionId
      );
      Loading.hide();
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data", response: null };
    }
  }

  async getUserNotifications(
    page: number,
    size: number,
    product?: string
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "services/notification-service/api/v1/notification/users",
        {
          page,
          size,
          product,
        }
      );
      Loading.hide();
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data", response: e };
    }
  }

  async getUserNotificationsUnread(): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "services/notification-service/api/v1/notification/users/number-unread",
        {}
      );
      const data = response.data;
      Loading.hide();
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data", response: e };
    }
  }

  async deleteNotifyCount(): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        "services/notification-service/api/v1/notification/users",
        {}
      );
      Loading.hide();
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data", response: e };
    }
  }

  async getCountUnRead(): Promise<any> {
    // showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "services/notification-service/api/v1/notification/users/counters",
        {}
      );
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      return { kind: "bad-data", response: e };
    }
  }

  async delateCountUnRead(): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.delete(
        "services/notification-service/api/v1/notification/users/counters",
        {}
      );
      Loading.hide();
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data", response: e };
    }
  }

  async putMarkRead(id: any): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        "services/notification-service/api/v1/notification/users/" + id,
        {}
      );
      Loading.hide();
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
}
