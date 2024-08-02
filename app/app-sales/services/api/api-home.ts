import { Api } from "../base-api/api";
import { ApiResponse } from "apisauce";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../../app-purchase/components/dialog-notification";
import { GetWayAPI } from "../base-api/api-config-get-way";
import { UAA_API } from "../base-api/api-config-uaa";

export class HomeApi {
  private api: Api;
  private uaa: UAA_API;
  private getWayAPI: GetWayAPI;

  constructor(api: Api, uaa: UAA_API, getWayAPI: GetWayAPI) {
    this.api = api;
    this.uaa = uaa;
    this.getWayAPI = getWayAPI;
  }

  async getBalance(): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.LIST_PRODUCT,
        {
          page: 0,
          size: 20,
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
  
  async getListCompany(userId: any): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.uaa.apisauce.get(
        ApiEndpoint.GET_LIST_COMPANY,
        {
          userId,
        }
      );
      console.log("company", response);
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
}
