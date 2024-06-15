import { ApiResponse } from "apisauce";
import { hideLoading, showLoading } from "../../utils/toast";
import { ApiErp } from "../base-api/api-config-erp";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { OderListResponse  } from "../../models/order-list-select-clien-model";
import { Loading } from "../../components/dialog-notification";

export class SelectClientAPI {
   private api: ApiErp; 
   
   constructor(api: ApiErp){
    this.api = api
   }


   async getListSelectClient (
    page: number,
    size: number,
    sort: string,
    search: string,
   ): Promise<any> {
    Loading.show({
      text: 'Loading...',
    })
        try {
         
            console.log("doandev url " , this.api.config.url);
            
            const response:  ApiResponse<BaseResponse<OderListResponse, ErrorCode>> = await this.api.apisauce.get(
                ApiEndpoint.GET_LIST_SELECT_CLIENT,
                // truyền params.
                {
                  page: page,
                  size: size,
                  sort: sort,
                  search: search,
                }
              );
              Loading.hide();
              const result = response.data;

              if (result?.data != null) {
                return result;
              } else {
                return result?.errorCodes ;
              }   
        } catch (error) {
            return { kind: "bad-data", result: error };
            
        }

   } 
}