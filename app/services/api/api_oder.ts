import { ApiResponse } from "apisauce";
import { hideLoading, showLoading } from "../../utils/toast";
import { ApiOrder } from "../base-api/api-config-order";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { Loading } from "../../components/dialog-notification";
import { ApiAccounting } from "../base-api/api-config-accounting";
import { TaxModel } from "../../models/order-store/entities/order-tax-model";

export class OrderApi {
  private api: ApiOrder;
  private apiAccount: ApiAccounting;

  constructor(api: ApiOrder, apiAccount: ApiAccounting) {
    this.api = api;
    this.apiAccount = apiAccount;
  }

  async getListOrder(page: number, size: number): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      // console.log('first0--' ,ApiEndpoint.GET_LIST_ORDER )
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_ORDER,
        {
          page,
          size,
          // activated
        }
      );
      Loading.hide();
      console.log("-----------------respone", response);
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
  async getListOrderProduct(
    page: number,
    size: number,
    productCategoryId: number,
    search: string,
    // tagId: number,
    sort: string,
    isLoadMore: boolean,
    warehouseId: number
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_ORDER_PRODUCT + sort,
        {
          page: page,
          size: size,
          productCategoryId: productCategoryId,
          search: search,
          // tagId: tagId == 0 ? null : tagId,
          warehouseId: warehouseId,
        }
      );
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
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
  async getListOrderVariant(
    page: number,
    size: number,
    productCategoryId: number,
    search: string,
    // tagId: number,
    sort: string,
    isLoadMore: boolean,
    warehouseId: number,
    productTemplateId: number
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_ORDER_VARIANT + sort,
        {
          page: page,
          size: size,
          productCategoryId: productCategoryId,
          search: search,
          // tagId: tagId == 0 ? null : tagId,
          warehouseId: warehouseId,
          productTemplateId: productTemplateId,
        }
      );
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
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
  async getListOrderProductPrice(
    page: number,
    size: number,
    productCategoryId: number,
    search: string,
    // tagId: number,
    sort: string,
    isLoadMore: boolean,
    warehouseId: number,
    priceListId: number
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_ORDER_PRODUCT_PRICE + sort,
        {
          page: page,
          size: size,
          productCategoryId: productCategoryId,
          search: search,
          // tagId: tagId == 0 ? null : tagId,
          warehouseId: warehouseId,
          priceListId: priceListId,
        }
      );
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
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
  async getListOrderVariantPrice(
    page: number,
    size: number,
    productCategoryId: number,
    search: string,
    // tagId: number,
    sort: string,
    isLoadMore: boolean,
    warehouseId: number,
    productTemplateId: number,
    priceListId: number
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_ORDER_VARIANT_PRICE + sort,
        {
          page: page,
          size: size,
          productCategoryId: productCategoryId,
          search: search,
          // tagId: tagId == 0 ? null : tagId,
          warehouseId: warehouseId,
          productTemplateId: productTemplateId,
          priceListId: priceListId,
        }
      );
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
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

  async getDetailOrder(id: number): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_DETAIL_ORDER,
        {
          id,
        }
      );
      Loading.hide();
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data.message);
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();

      return { kind: "bad-data" };
    }
  }

  async getTaxList(
    type: any,
    scopeType: any
  ): Promise<BaseResponse<TaxModel, ErrorCode>> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<BaseResponse<TaxModel, ErrorCode>> =
        await this.apiAccount.apisauce.get(ApiEndpoint.GET_LIST_TAX, {
          type: type,
          scopeType: scopeType,
        });
      const data = response.data;
      if (response.status === 200) {
        return data;
      }
      return data;
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
}