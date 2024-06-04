import { ApiErp } from "../base-api/api-config-erp";
import { ApiResponse } from "apisauce";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../components/dialog-notification";
import { VendorResult } from "../../models/vendor/vendor-model";

export class VendorApi {
  private api: ApiErp;

  constructor(api: ApiErp) {
    this.api = api;
  }

  async getListVendor(
    page: number,
    size: number,
    vendorActivated: boolean,
    search: string
  ): Promise<VendorResult> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      console.log("getListVendor1111", this.api.config.url);

      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_VENDOR,
        {
          page: page,
          size: size,
          vendorActivated: vendorActivated,
          search: search,
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
      Loading.hide();
      return { kind: "bad-data", result: error };
    }
  }
  async getInfoCompany(): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      console.log("getListInfoCompany1111", this.api.config.url);
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.COMPANY_INFO
      );
      Loading.hide();
      const result = response.data;
      if (response.data.data) {
        return { kind: "ok", result };
      } else {
        return { kind: "bad-data", result };
      }
    } catch (error) {
      Loading.hide();
      return { kind: "bad-data", result: error };
    }
  }
}
