import { configs } from "./../../theme/dimension";
import { Api } from "./api";
import { ApiResponse } from "apisauce";
import { ApiEndpoint } from "./api_endpoint";
import { hideLoading, showLoading } from "../../utils/toast";
import { BalanceResult } from "./api.types.home";
import { Data } from "../../models/product-store/tag-product-model";
import { Brand } from "../../models/brand-model";

export class ProductApi {
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
  async getListProduct(
    page: number,
    size: number,
    viewProduct: any,
    productCategoryId: number,
    search: string,
    tagId: number,
    sort: string
  ): Promise<any> {
    showLoading();
    try {
      // console.log("tagId-------------------- :", tagId);
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_PRODUCT + sort,
        {
          page: page,
          size: size,
          viewProduct: viewProduct,
          productCategoryId: productCategoryId,
          search: search,
          tagId: tagId == 0 ? null : tagId,
        }
      );
      const data = response.data;
      console.log("dataa :", page);
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }
  async getDetailProduct(id: number): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_PRODUCT_DETAIL,
        {
          id,
        }
      );
      const data = response.data;
      console.log(data);
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }
  async getDetailClassify(id: number): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_CLASSIFY_DETAIL,
        {
          id,
        }
      );
      const data = response.data;
      console.log(data);
      if (response.data.message === "Success") {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }
  async getListTagProduct(): Promise<Data> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.LIST_TAG_PRODUCT,
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

  async putMoveCategory(fromId: any, toId: any): Promise<Brand> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        ApiEndpoint.PUT_MOVE_CATEGORY +
          "?" +
          "fromId=" +
          fromId +
          "&" +
          "toId=" +
          toId
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
  async getListBrandProduct(): Promise<Brand> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.LIST_BRAND_PRODUCT,
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
  async createProduct(product: any): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        ApiEndpoint.ADD_PRODUCT,
        product
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
  async editProduct(id: any, product: any): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        ApiEndpoint.ADD_PRODUCT + "?id=" + id,
        product
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
  async deleteProduct(id: any): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.delete(
        ApiEndpoint.ADD_PRODUCT + "?id=" + id
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
  async deleteCheck(id: any): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.DELETE_CHECK + '?productId=' +id,
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
  async uploadImages(
    formData: any,
    callBack: (arg0: number) => void
  ): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        `${ApiEndpoint.UPLOAD_IMAGES}?feature_alias=upload-product`,
        formData,
        {
          onUploadProgress(progressEvent) {
            //if (progressEvent && progressEvent.total && progressEvent.loaded) {
            const percent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            console.log("Upload progress:", percent, "%");
            callBack(percent);
            // } else {
            //   console.error('Progress event does not contain necessary properties');
            // }
          },
        }
      );
      const result = response;
      console.log("respone", response);
      hideLoading();
      return { kind: "ok", result };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data" };
    }
  }
  
}