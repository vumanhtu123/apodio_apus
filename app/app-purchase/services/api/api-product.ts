import { configs } from "./../../theme/dimension";
import { Api } from "../base-api/api";
import { ApiResponse } from "apisauce";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { Data, TagResult } from "../../models/product-store/tag-product-model";
import { Brand, BrandResult } from "../../models/brand-model";
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../../components/dialog-notification";
import { VendorResult } from "../../models/product-store/vendor-model";
import { ApiUpload } from "../base-api/api_upload";

export class ProductApi {
  private api: Api;
  private apiUpload: ApiUpload;

  constructor(api: Api, apiUpload: ApiUpload) {
    this.api = api;
    this.apiUpload = apiUpload;
  }

  async getBalance(): Promise<any> {
    Loading.show({
      text: "Loading...",
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
  async getListProduct(
    page: number,
    size: number,
    viewProduct: any,
    productCategoryId: number,
    search: string,
    tagId: number,
    sort: string,
    isLoadMore: boolean,
    vendorId: any
  ): Promise<any> {
    if (!isLoadMore) {
      Loading.show({
        text: "Loading...",
      });
    }
    try {
      console.log("dataa :", page);
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_PRODUCT + sort,
        {
          page: page,
          size: size,
          viewProduct: viewProduct,
          productCategoryId: productCategoryId,
          search: search,
          tagId: tagId == 0 ? null : tagId,
          vendorId: vendorId
        }
      );
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
  async getDetailProduct(id: number): Promise<any> {
    // Loading.show({
    //   text: "Loading...",
    // });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_PRODUCT_DETAIL,
        {
          id,
        }
      );
      const data = response.data;
      console.log(data);
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
  async getDetailClassify(id: number): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_CLASSIFY_DETAIL,
        {
          id,
        }
      );
      const data = response.data;
      console.log(data);
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
  async getListTagProduct(): Promise<TagResult> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.LIST_TAG_PRODUCT,
        {
          page: 0,
          size: 20,
        }
      );
      Loading.hide();
      const result = response.data;
      if (response.data.data) {
        return { kind: "ok", result: result };
      } else {
        return { kind: "bad-data", result: result };
      }
    } catch (error) {
      Loading.hide();
      return { kind: "bad-data", result: error };
    }
  }

  async putMoveCategory(fromId: any, toId: any): Promise<Brand> {
    Loading.show({
      text: "Loading...",
    });
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
  async getListBrandProduct(search: any): Promise<BrandResult> {
    // Loading.show({
    //   text: "Loading...",
    // });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.LIST_BRAND_PRODUCT,
        {
          page: 0,
          size: 20,
          search: search
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
  async createProduct(product: any): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        ApiEndpoint.ADD_PRODUCT,
        product
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
  async editProduct(id: any, product: any): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        ApiEndpoint.ADD_PRODUCT + "?id=" + id,
        product
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

  async editClassify(id: any, product: any): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        ApiEndpoint.EDIT_CLASSIFY + "?id=" + id,
        product
      );
      Loading.hide();
      console.log("-------editClassify------", response.data);
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

  async deleteProduct(id: any): Promise<any> {
    Loading.show({
      text: "Loading...",
      onShow: () => console.log("Loading shown"),
      onHide: () => console.log("Loading hidden"),
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.delete(
        ApiEndpoint.ADD_PRODUCT + "?id=" + id
      );
      Loading.hide();
      console.log("----------delete", response.status);
      const result = response.data;
      if (response.data.errorCodes) {
        return { kind: "bad-data", result };
      } else {
        return { kind: "ok", result };
      }
    } catch (error) {
      Loading.hide();
      return { kind: "bad-data", result: error };
    }
  }

  async deleteClassify(id: any): Promise<any> {
    Loading.show({
      text: "Loading...",
      onShow: () => console.log("Loading shown"),
      onHide: () => console.log("Loading hidden"),
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.delete(
        ApiEndpoint.DELETE_CLASSIFY + "?id=" + id
      );
      Loading.hide();
      console.log("----------delete", response);
      const result = response.data;
      if (response.data.errorCodes) {
        return { kind: "bad-data", result };
      } else {
        return { kind: "ok", result };
      }
    } catch (error) {
      Loading.hide();
      return { kind: "bad-data", result: error };
    }
  }

  async deleteCheck(id: any): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.DELETE_CHECK + "?productId=" + id
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
  async usingProductCheck(id: any): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.USING_PRODUCT_CHECK + "?id=" + id
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
  async uploadImages(
    formData: any,
    callBack: (arg0: number) => void
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
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
      Loading.hide();
      return { kind: "ok", result };
    } catch (e) {
      Loading.hide();
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data" };
    }
  }

  async getPriceOrderVariant(value: any): Promise<any> {
    // Loading.show({
    //   text: "Loading...",
    // });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        ApiEndpoint.POST_PRICE_VARIANT,
        value
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
      // Loading.hide()
      return { kind: "bad-data" };
    }
  }

  async getListVendor(page: number, search: string): Promise<VendorResult> {
    if (page === 0) {
      Loading.show({
        text: "Loading...",
      });
    }
    try {
      const response: ApiResponse<any> = await this.apiUpload.apisauce.get(
        ApiEndpoint.GET_VENDOR,
        {
          page: page,
          size: 20,
          search: search,
        }
      );
      const data = response.data;
      console.log("vendor list", data);
      Loading.hide();
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data", response: e };
    }
  }
}
