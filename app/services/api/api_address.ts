import { ApiResponse } from "apisauce";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../components/dialog-notification";
import { ApiAddress } from "../base-api/api-config-address";

export class AddressApi {
  private api: ApiAddress;

  constructor(api: ApiAddress) {
    this.api = api;
  }

  async getListCity(
    page: number,
    size: number,
    search: string,
    countryId: number,
    // regionId: number,
  ): Promise<any> {
    // Loading.show({
    //   text: "Loading...",
    // });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_CITY + '?countryId=' + countryId + '&page=' + page +'&size=' +size,
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
      Loading.hide()
      return { kind: "bad-data" };
    }
  }
  async getListDistrict(
    page: number,
    size: number,
    search: string,
    cityId: number,
  ): Promise<any> {
    // Loading.show({
    //   text: "Loading...",
    // });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_DISTRICT + '?countryId=' + cityId + '&page=' + page +'&size=' +size,
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
      Loading.hide()
      return { kind: "bad-data" };
    }
  }
  async getListWard(
    page: number,
    size: number,
    search: string,
    districtId: number,
  ): Promise<any> {
    // Loading.show({
    //   text: "Loading...",
    // });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_WARD + '?countryId=' + districtId + '&page=' + page +'&size=' +size,
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
      Loading.hide()
      return { kind: "bad-data" };
    }
  }
  async createAddress(
   value: any
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(ApiEndpoint.CREATE_ADDRESS, 
        value
      )
      Loading.hide();
      const data = response.data
      if (response.data.data) {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" }
    }
  }
  async getListAddress(
    partnerId: any,
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(ApiEndpoint.GET_LIST_ADDRESS, 
        {partnerId}
      )
      Loading.hide();
      const data = response.data
      if (response.data.data) {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" }
    }
  }
}
