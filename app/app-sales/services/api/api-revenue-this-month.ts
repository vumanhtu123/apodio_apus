import { ApiResponse } from 'apisauce';
import { hideLoading, showLoading } from "../../utils/toast";
import { ApiOrder } from "../base-api/api-config-order";
import { RevenueThisMonthResponse } from '../../models/dashboard-store/revenue-this-month-model';
import { ApiEndpoint } from '../base-api/api_endpoint';

export class RevenueThisMonthAPI {
    private api : ApiOrder ;

    constructor(api: ApiOrder){
        this.api = api
    }

    async getDataRevenueThisMonth (
        startDate: string,
        endDate: string
    ): Promise<any> {
        showLoading()
        try {
            const response : ApiResponse<BaseResponse<RevenueThisMonthResponse, ErrorCode>> = 
            await this.api.apisauce.get(
                ApiEndpoint.GET_DATA_REVENUE_THIS_MONTH,{
                    startDate : startDate,
                    endDate : endDate
                }
            );
            hideLoading()
             const result = response.data
            console.log('====================================');
            console.log("doan get Data", result?.data);
            console.log('====================================');
            if(result?.data != null){
                return result
            }else{
                return result?.errorCodes
            }
        } catch (error) {
            return { kind: "bad-data", result: error }; 
        }
    }
}