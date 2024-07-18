import { id } from 'date-fns/locale';
import { ApiResponse } from "apisauce";
import { ApiErp } from "../base-api/api-config-erp";
import { ResponseWarehouse } from "../../models/warehouse-store/warehouse-model";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { ApiWarehouse } from "../base-api/api-config-warehouse";
import { Loading } from "../../components/dialog-notification";
import { DataDetailWarehouse } from '../../models/warehouse-store/detail-warehouse-model';

export class WarehouseAPI {
  private api: ApiWarehouse;

  constructor(api: ApiWarehouse) {
    this.api = api;
  }

  async getListWarehouse(
    size: number,
    page: number,
    search: string,
    state: string,
    isLoadMore: boolean
  ): Promise<any> {
    console.log("value isVisible", isLoadMore);

    if (isLoadMore == true) {
      Loading.hide();
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
        console.log("====================================");
        console.log("my data warehouse", result);
        console.log("====================================");
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
        console.log("====================================");
        console.log("my data warehouse", result);
        console.log("====================================");
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

  async getDetailWarehouse( id: number) : Promise<any> {
        try {
                console.log("doandev url detail warehouse ", this.api.config.url);

                const response : ApiResponse<BaseResponse<ResponseWarehouse,ErrorCode>> = await 
                this.api.apisauce.get(
                    ApiEndpoint.GET_DETAIL_WAREHOUSE,
                    {
                        id: id
                    }
                )
                const result = response.data;
                console.log('data result detail warehouse', result);

                if (result?.data != null ) {
                    console.log('data result detail warehouse2', result);

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
        return result?.errorCodes;
      }
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
}
