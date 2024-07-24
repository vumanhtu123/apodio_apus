import { Api } from "../base-api/api";
import { ApiResponse } from "apisauce";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../components/dialog-notification";


export class CategoryApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
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
      Loading.hide();
      return { kind: "bad-data", result: error };
    }
  }
  async getListCategories(
    page: any,
    size: any,
    search: any,
    sort: string,
    isLoadMore: any
  ): Promise<any> {
    if (!isLoadMore) {
      Loading.show({
        text: 'Loading...',
      });
    }
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.LIST_CATEGORY + sort,
        {
          page: page,
          size: size,
          search: search,
        }
      );
      Loading.hide();
      console.log("page", page);
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
  async getListCategoriesFilter(
    page: any,
    size: any,
    search: any
  ): Promise<any> {
    // Loading.show({
    //   text: 'Loading...',
    // });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.LIST_CATEGORY,
        {
          page: page,
          size: size,
          search: search
        }
      );
      console.log("page", page);
      // Loading.hide();
      console.log(response)
      const data = response.data;
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      // Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async getListCategoriesModal(
    page: any,
    size: any,
    search: any
  ): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.LIST_CATEGORY,
        {
          page: page,
          size: size,
          search: search,
        }
      );
      Loading.hide();
      console.log("page", page);
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
  async getDeleteCategories(productCategoryId: number): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.delete(
        ApiEndpoint.DELETE_CATEGORY,
        { productCategoryId }
      );
      console.log('------------------------------response delete category', response)
      const data = response.data;
      Loading.hide();
      if (response.data.errorCodes) {
        return { kind: "bad-data", response: data };
      }
      return { kind: "ok", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async createCategories(name: string, imageUrl: string): Promise<any> {
    // Loading.show({
    //   text: 'Loading...',
    // });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        ApiEndpoint.CREATE_CATEGORY,
        {
          name,
          imageUrl,
          activated: true
        }
      );
      // Loading.hide();
      const data = response.data;
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      // Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async getUpdateCategories(
    name: string,
    imageUrl: string,
    productCategoryId: number
  ): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const url = `${ApiEndpoint.UPDATE_CATEGORY
        }?productCategoryId=${encodeURIComponent(productCategoryId)}`;
      const body = { name, imageUrl };
      const response: ApiResponse<any> = await this.api.apisauce.put(url, body);
      console.log("mmm", url);
      const data = response.data;
      Loading.hide();
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
