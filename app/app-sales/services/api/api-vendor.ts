import { ApiErp } from "../base-api/api-config-erp";
import { ApiResponse } from "apisauce";
import { ApiEndpoint } from "../base-api/api_endpoint";
import {
  ALERT_TYPE,
  Dialog,
  Toast,
  Loading,
} from "../../../components/dialog-notification";
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
      text: "Loading...",
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
      text: "Loading...",
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

  async getListCity(
    page: number,
    size: number,
    search: string,
    countryId: number
    // regionId: number,
  ): Promise<any> {
    // Loading.show({
    //   text: "Loading...",
    // });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_CITY +
          "?countryId=" +
          countryId +
          "&page=" +
          page +
          "&size=" +
          size,
        {
          page: page,
          size: size,
          search: search,
          countryId: countryId,
          // regionId: regionId,
        }
      );
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
      // Loading.hide();
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async getListDistrict(
    page: number,
    size: number,
    search: string,
    cityId: number
  ): Promise<any> {
    // Loading.show({
    //   text: "Loading...",
    // });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_DISTRICT +
          "?countryId=" +
          cityId +
          "&page=" +
          page +
          "&size=" +
          size,
        {
          page: page,
          size: size,
          search: search,
          cityId: cityId,
        }
      );
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
      // Loading.hide();
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async getListWard(
    page: number,
    size: number,
    search: string,
    districtId: number
  ): Promise<any> {
    // Loading.show({
    //   text: "Loading...",
    // });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_WARD +
          "?countryId=" +
          districtId +
          "&page=" +
          page +
          "&size=" +
          size,
        {
          page: page,
          size: size,
          search: search,
          districtId: districtId,
        }
      );
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
      // Loading.hide();
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async createAddress(value: any): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        ApiEndpoint.CREATE_ADDRESS,
        value
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
  async getListAddress(partnerId: any): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_ADDRESS,
        { partnerId,
          addressType: "DELIVERY_ADDRESS",
        }
      );
      Loading.hide();
      const data = response.data;
      console.log("-----------------data", data);
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  
}
