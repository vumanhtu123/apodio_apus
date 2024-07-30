import { id } from "date-fns/locale";
import { ApiErp } from "../base-api/api-config-erp";
import { ResponseWarehouse } from "../../models/warehouse-store/warehouse-model";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { ApiWarehouse } from "../base-api/api-config-warehouse";
import { Loading } from "../../components/dialog-notification";
import { DataDetailWarehouse } from "../../models/warehouse-store/detail-warehouse-model";
import { ApiResponse } from "apisauce";
import { Api } from "../base-api/api";
import { UnitResult } from "../../models/unit/unit-model";

export class WarehouseAPI {
  private api: ApiWarehouse;
  private apiPrd: Api;

  constructor(api: ApiWarehouse, apiPrd: Api) {
    this.api = api;
    this.apiPrd = apiPrd;
  }

  async getListWarehouse(
    size: number,
    page: number,
    search: string,
    state: string | undefined,
    isLoadMore: boolean
  ): Promise<any> {
    console.log("value idLoadMore ------", isLoadMore);
    console.log("state ------", state);


    if (isLoadMore) {
   
      try {
        console.log("doandev url warehouse ", this.api.config.url);
        const response: ApiResponse<
          BaseResponse<ResponseWarehouse, ErrorCode>
        > = await this.api.apisauce.get(
          ApiEndpoint.GET_LIST_WAREHOUSE,
          // truyền params.
          {
            page: page,
            size: size,
            search: search,
            state: state,
          }
        );
        const result = response.data;
        // console.log("====================================");
        // console.log("my data warehouse", result);
        // console.log("====================================");
       
        if (result?.data != null) {
          return result;
        } else {
          return result?.errorCodes;
        }
      } catch (error) {
      
        return { kind: "bad-data", result: error };
      }
    } else {
      Loading.show({
        text: "Loading...",
      });
      try {
        console.log("doandev url warehouse ", this.api.config.url);
        const response: ApiResponse<
          BaseResponse<ResponseWarehouse, ErrorCode>
        > = await this.api.apisauce.get(
          ApiEndpoint.GET_LIST_WAREHOUSE,
          // truyền params.
          {
            page: page,
            size: size,
            search: search,
            state: state,
          }
        );
        const result = response.data;
        // console.log("====================================");
        // console.log("my data warehouse", result);
        // console.log("====================================");
        Loading.hide();
        if (result?.data != null) {
          return result;
        } else {
          return result?.errorCodes;
        }
      } catch (error) {
        Loading.hide();
        return { kind: "bad-data", result: error };
      }
    }
  }

  async getDetailWarehouse(id: number): Promise<any> {
    try {
      console.log("doandev url detail warehouse ", this.api.config.url);

      const response: ApiResponse<BaseResponse<ResponseWarehouse, ErrorCode>> =
        await this.api.apisauce.get(ApiEndpoint.GET_DETAIL_WAREHOUSE, {
          id: id,
        });
      const result = response.data;
      console.log("data result detail warehouse", result);

      if (result?.data != null) {
        console.log("data result detail warehouse2", result);

        return result;
      } else {
        return result?.errorCodes;
      }
    } catch (error) {
      return { kind: "bad-data", result: error };
    }
  }
  async getNumberState(value: string ): Promise<any>{
    try {
      console.log("doandev url detail warehouse ", this.api.config.url);

      const response : ApiResponse<BaseResponse<ResponseWarehouse,ErrorCode>> = await 
        this.api.apisauce.get(
          ApiEndpoint.NUMBER_STATE,
          {
            search: value
          }
        )
        const result = response.data;
        console.log('data result Number State warehouse', result);

        if (result?.data != null ) {
          console.log('data result', result);

          return result
        }else{
          return result?.errorCodes
        }

    } catch (error) {
     return { kind: "bad-data", result: error };
    }
  } 

  async createWareHouse(wareHouse: any): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      // console.log('first0--' ,ApiEndpoint.GET_LIST_ORDER )
      const response: ApiResponse<any> = await this.api.apisauce.post(
        ApiEndpoint.POST_STOCK_WAREHOUSE,
        wareHouse
      );
      Loading.hide();
      console.log("-----------------tuvm_warehouse", response);
      const result = response.data;
      console.log("-----------------tuvm_warehouse", result);
      if (result?.data != null) {
        return result;
      } else {
        return response;
      }
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }

  async deleteWarehouse(id: number): Promise<any> {
    try {
      console.log("url delete", ApiEndpoint.DELETE_WAREHOUSE);
      const response: ApiResponse<BaseResponse<any, ErrorCode>> =
        await this.api.apisauce.delete(
          ApiEndpoint.DELETE_WAREHOUSE + "?id=" + id,
          {},
          {
            data: {
              isMobile: true,
              reason: "string",
            },
          }
        );
      console.log("doandev test delete", response.data);
      const result = response.data;
      if (response.data != null) {
        return result;
      } else {
        return result?.errorCodes;
      }
    } catch (error) {
      console.log("error delete warehouse", error);
      return { kind: "bad-data", result: error };
    }
  }

  async updateWareHouse(wareHouse: any, id: any): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      // console.log('first0--' ,ApiEndpoint.GET_LIST_ORDER )
      const response: ApiResponse<any> = await this.api.apisauce.put(
        ApiEndpoint.PUT_STOCK_WAREHOUSE + "?id=" + id,
        wareHouse
      );
      Loading.hide();
      console.log("-----------------put_tuvm_warehouse", response);
      const result = response.data;
      console.log("-----------------put_tuvm_warehouse", result);
      if (result?.data != null) {
        return result;
      } else {
        return result?.errorCodes;
      }
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }

  async getListUnit(): Promise<UnitResult> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.apiPrd.apisauce.get(
        ApiEndpoint.LIST_UNIT,
        {
          activated: true,
          page: 0,
          size: 200,
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
}
