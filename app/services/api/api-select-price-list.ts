import { ApiResponse } from 'apisauce';
import { pagination } from './../../screens/introduction/introduction-screen';
import { Api } from "../base-api/api";
import { ApiConfig } from "../base-api/api-config";
import { ApiUpload } from "../base-api/api_upload";
import { hideLoading, showLoading } from '../../utils/toast';
import { PriceListResponse } from '../../models/select-price-list/select-price-list.-model';
import { ApiEndpoint } from '../base-api/api_endpoint';

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
        showLoading()
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
            hideLoading();
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