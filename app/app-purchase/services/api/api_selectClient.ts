
import { ApiResponse } from "apisauce";
import { ApiErp } from "../base-api/api-config-erp";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { OderListResponse  } from "../../models/order-list-select-clien-model";
import { Loading } from "../../components/dialog-notification";
import { TagList } from '../../models/tag-list-filter-client-model';

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
    b2cActivated: boolean,
    isLoadMore: boolean,
    partnerTagIds?: []
   ): Promise<any> {
      if (isLoadMore){
        Loading.hide 
        
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
                b2cActivated: b2cActivated,
                partnerTagIds: partnerTagIds,
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
          Loading.hide();
            return { kind: "bad-data", result: error };
            
        }
      }else{
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
                b2cActivated: b2cActivated,
                partnerTagIds: partnerTagIds,
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
        Loading.hide();
          return { kind: "bad-data", result: error };
          
      }}
    }

    async getListTagClient (
      activated : boolean
    ): Promise<any> {
      Loading.show({
          text: 'Loading...',
      })

      try {
        console.log("doandev url tag filter client " , this.api.config.url);
          
        const response:  ApiResponse<BaseResponse<TagList, ErrorCode>> =  await  this.api.apisauce.get(
          ApiEndpoint.GET_LIST_TAG_CLIENT,
          {
              activated : activated
          }
        );
          Loading.hide();
          const result = response.data

          if (result?.data != null) {
            return result;
          } else {
            return result?.errorCodes ;
          }  
          
      } catch (error) {
          Loading.hide();
          return { kind: "bad-data", result: error };
      }
  }


}