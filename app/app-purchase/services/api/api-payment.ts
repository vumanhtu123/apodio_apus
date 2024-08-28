import { ApiResponse } from "apisauce";
import { Loading } from "../../../components/dialog-notification";
import { GetWayAPI } from "../base-api/api-config-get-way";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { ApiAccounting } from "../base-api/api-config-accounting";
export class PaymentApi {
  private apiAccounting: ApiAccounting;

  constructor(getWayAPI: ApiAccounting) {
    this.apiAccounting = getWayAPI;
  }

  async getTotal(): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.apiAccounting.apisauce.get(
        ApiEndpoint.GET_PAYMENT_TOTAL,
        {
          search: "",
          start: "2024-06-01",
          end: "2024-08-31",
        }
      );
      Loading.hide();
      const result = response.data;
      if (response.data.data) {
        return { kind: "ok", result };
      } else {
        return { kind: "bad-data", result };
      }
    } catch (error) {
      return { kind: "bad-data", result: error };
    }
  }

  async getPaymentList(
    search: string,
    start: any,
    end: any,
    page: number,
    size: number,
    paymentTypes?: any
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.apiAccounting.apisauce.get(
        ApiEndpoint.GET_PAYMENT_LIST,
        paymentTypes == undefined
          ? {
              search: search,
              start: start,
              end: end,
              page: page,
              size: size,
            }
          : {
              search: search,
              start: start,
              end: end,
              page: page,
              size: size,
              paymentTypes: paymentTypes,
            }
      );
      Loading.hide();
      const result = response.data;
      if (response.data.data) {
        return { kind: "ok", result };
      } else {
        return { kind: "bad-data", result };
      }
    } catch (error) {
      return { kind: "bad-data", result: error };
    }
  }
}
