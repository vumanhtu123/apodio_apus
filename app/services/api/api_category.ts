import { BalanceResult } from './api.types.home';
import { Api } from "./api";
import { ApiResponse } from "apisauce";
import { ApiEndpoint } from "./api_endpoint";
import { hideLoading, showLoading } from "../../utils/toast";


export class CategoryApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
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
  async getListCategories(
    page: any,
    size: any,
    search: any,
    sort: string
  ): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.LIST_CATEGORY + sort,
        {
          page: page,
          size: size,
          search: search,
        }
      );
      console.log("page", page);
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }
  async getListCategoriesModal(
    page: any,
    size: any,
    search: any
  ): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.LIST_CATEGORY,
        {
          page: page,
          size: size,
          search: search,
        }
      );
      console.log("page", page);
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }
  async getDeleteCategories(productCategoryId: number): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.delete(
        ApiEndpoint.DELETE_CATEGORY,
        { productCategoryId }
      );
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }
  async getCreateCategories(name: string, imageUrl: string): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        ApiEndpoint.CREATE_CATEGORY,
        { name, imageUrl }
      );
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }
  async getUpdateCategories(
    name: string,
    imageUrl: string,
    productCategoryId: number
  ): Promise<any> {
    showLoading();
    try {
      const url = `${
        ApiEndpoint.UPDATE_CATEGORY
      }?productCategoryId=${encodeURIComponent(productCategoryId)}`;
      const body = { name, imageUrl };
      const response: ApiResponse<any> = await this.api.apisauce.put(url, body);
      console.log("mmm", url);
      const data = response.data;
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }
}
