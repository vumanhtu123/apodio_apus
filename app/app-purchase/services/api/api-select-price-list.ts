import { ApiResponse } from 'apisauce';
import { Api } from "../base-api/api";
import { PriceListResponse } from '../../models/select-price-list/select-price-list-model';
import { ApiEndpoint } from '../base-api/api_endpoint';
import { Loading } from '../../../components/dialog-notification';

export class SelectPriceListAPI {
    private api : Api;

    constructor(api: Api){
        this.api = api
    }

    async getSelectPriceListAPI (
        page: number,
        size: number,
        sort: string,
        search: string
    ): Promise<any> {
        Loading.show({
            text: 'Loading...',
          })
        try {
            console.log("doan dev :" , this.api.config.url)
            
            const response : ApiResponse<BaseResponse<PriceListResponse, ErrorCode>>= await this.api.apisauce.get(
                ApiEndpoint.GET_LIST_PRICE_LIST,
                // truyền params.
                {
                    page : page,
                    size : size,
                    sort : sort,
                    search : search
                }
            );
            Loading.hide();
            const result  = response.data;
            if (result?.data != null){
                return result
            }else{
                return  result?.errorCodes;
            } 
        } catch (error) {
            return { kind: "bad-data", result: error };  
        }
    }


}