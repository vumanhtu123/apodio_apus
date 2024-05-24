import { Api } from "./api";
import { ApiResponse } from "apisauce";
import { ApiEndpoint } from "./api_endpoint";
import { hideLoading, showDialog, showLoading } from "../../utils/toast";
import { BalanceResult } from "./api.types.home";
import { GetWayAPI } from "./api-config-get-way";
import { UAA_API } from "./api-config-uaa";

export class HomeApi {
  private api: Api;
  private uaa: UAA_API;
  private getWayAPI: GetWayAPI;

  constructor(api: Api, uaa: UAA_API, getWayAPI: GetWayAPI) {
    this.api = api;
    this.uaa = uaa;
    this.getWayAPI = getWayAPI;
  }

  async getBalance(): Promise<BalanceResult> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.LIST_PRODUCT,
        {
          page: 0,
          size: 20,
        }
      );
      hideLoading();
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
    showLoading();
    try {
      const response: ApiResponse<any> = await this.uaa.apisauce.get(
        ApiEndpoint.GET_LIST_COMPANY,
        {
          userId,
        }
      );
      console.log("company", response.data);
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
