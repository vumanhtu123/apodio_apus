import { ErrorCode } from './../../models/errors';
import { ApiAccounting } from './../base-api/api-config-accounting';
import { ApiErp } from "../base-api/api-config-erp";
import { string } from 'mobx-state-tree/dist/internal';
import { ApiResponse } from 'apisauce';
import { ApiEndpoint } from '../base-api/api_endpoint';
import { DataTotal } from '../../models/debt-store/entities/debt-modal';
import { DataMustPay } from '../../models/debt-store/entities/debt-must-pay';
import { Loading } from '../../../components/dialog-notification';
import { ListDetailDataDebt, RootValuePay } from '../../models/debt-store/entities/debt-list-detail-model';

export class DebtAPi {
    private  api: ApiErp;
    private apiAccounting: ApiAccounting;
    
    constructor(api: ApiErp, _apiAccounting: ApiAccounting ){
        this.api = api;
        this.apiAccounting = _apiAccounting;
    }

    async getTotalDebt (
        type: string
    ): Promise<any> {
            try {
                const response: ApiResponse<BaseResponse<DataTotal, ErrorCode>> = await this.apiAccounting.apisauce.get(
                    ApiEndpoint.GET_TOTAL_DEBT,
                    {
                        type
                    }
                );
                const  result = response.data
                console.log("Total_debt-----------------",result?.data);

                if(result?.data !== null){
                    return result
                }else{
                    return result.errorCodes;
                }
            } catch (e) {
                return{ kind: "Bad-data-Total-debt"}
            }
    };

    async getListDebtMustPay (
        size: number,
        page: number,
        search: string,
        type: string,
        debtAmountDesc: boolean,
        start: string | null,
        end: string | null,
        isLoadMore: boolean

    ) : Promise<any>{
        if(isLoadMore == false){
            Loading.show({
                text: "Loading..."
            })
        }
        try {
            const response: ApiResponse<BaseResponse<DataMustPay, ErrorCode>> = 
                await this.apiAccounting.apisauce.get(
                    ApiEndpoint.GET_LIST_DEBT_MUST_PAY,
                    {
                        size,
                        page,
                        search,
                        type,
                        start,
                        end,
                        debtAmountDesc 
                    }
                ) 

            if(response.data !== null){
                Loading.hide()
                return {kind: "ok", data: response.data}
                
            }else{
                Loading.hide()
                return {kind: "bad-data", data: response.data}
            }
        } catch (error) {
            Loading.hide()
            return {kind: "bad-data"}
        }
    };

    async getDebtDetail (
        partnerId: number,
        type:string

    ) : Promise<any>{
        
        try {
            const response: ApiResponse<BaseResponse<DataMustPay, ErrorCode>> = 
                await this.apiAccounting.apisauce.get(
                    ApiEndpoint.GET_DATA_DEBT_DETAIL,
                    {
                        partnerId,
                        type 
                    }
                ) 

            if(response.data !== null){
                console.log('====================================');
                console.log("Lay Data", response.data);
                console.log('====================================');
                Loading.hide()
                return {kind: "ok", data: response.data}
                
            }else{
                Loading.hide()
                return {kind: "bad-data", data: response.data}
            }
        } catch (error) {
            Loading.hide()
            return {kind: "bad-data"}
        }
    };

    async getListDetailDebt (
        page: number,
        size: number,
        partnerId: number,
        type:string,
        start: string | null,
        end: string | null,
        debtAmountDesc: boolean,
        search: string | null,
        isLoadMore: boolean

    ) : Promise<any>{
        if(isLoadMore == false){
            Loading.show({
                text: "Loading..."
            })
        }
        try {
            const response: ApiResponse<BaseResponse<ListDetailDataDebt, ErrorCode>> = 
                await this.apiAccounting.apisauce.get(
                    ApiEndpoint.GET_LIST_DETAIL_DEBT,
                    {   size,
                        page,
                        search,
                        partnerId,
                        type,
                        start,
                        end,
                        debtAmountDesc
                    }
                ) 

            if(response.data !== null){
                console.log('====================================');
                console.log("Lay Data 12333333", response.data);
                console.log('====================================');
                Loading.hide()
                return {kind: "ok", data: response.data}
                
            }else{
                Loading.hide()
                return {kind: "bad-data", data: response.data}
            }
        } catch (error) {
            Loading.hide()
            return {kind: "bad-data"}
        }
    };

    async getValueDebt (
        orderId: number,
        moveType: string

    ) : Promise<any>{
        // if(isLoadMore == false){
            Loading.show({
                text: "Loading..."
            })
        // }
        try {
            const response: ApiResponse<BaseResponse<RootValuePay , ErrorCode>> = 
                await this.apiAccounting.apisauce.get(
                    ApiEndpoint.GET_VALUE_DEBT,
                    {   
                        orderId,
                        moveType,
                    }
                ) 

            if(response.data !== null){
                console.log('====================================');
                console.log("ValueDebt", response.data);
                console.log('====================================');
                Loading.hide()
                return {kind: "ok", data: response.data}
                
            }else{
                Loading.hide()
                return {kind: "bad-data", data: response.data}
            }
        } catch (error) {
            Loading.hide()
            return {kind: "bad-data"}
        }
    };

    async getIdSentAccountingBook (
        isDefault: boolean
    ): Promise<any>{
    
        try {
            const response: ApiResponse<BaseResponse<RootValuePay , ErrorCode>> = 
                await this.apiAccounting.apisauce.get(
                    ApiEndpoint.GET_ID_SENT_ACCOUNTING_BOOK,
                    {   
                        isDefault
                    }
                ) 

            if(response.data !== null){
                console.log('====================================');
                console.log("getIdSentAccountingBook", response.data);
                console.log('====================================');
                Loading.hide()
                return {kind: "ok", data: response.data}
            }else{
                Loading.hide()
                return {kind: "bad-data", data: response.data}
            }
        } catch (error) {
            Loading.hide()
            return {kind: "bad-data"}
        }
    };

    async getListSelectAccountingBook (
        page: number,
        size: number,
        accountLedgerId: number,
        type: string
    ): Promise<any>{
    
        try {
            const response: ApiResponse<BaseResponse<RootValuePay , ErrorCode>> = 
                await this.apiAccounting.apisauce.get(
                    ApiEndpoint.GET_LIST_SELECT_ACCOUNTING_BOOK,
                    {   
                        page,
                        size,
                        accountLedgerId,
                        type
                    }
                ) 

            if(response.data !== null){
                console.log('====================================');
                console.log("getListSelectAccountingBook----------", response.data);
                console.log('====================================');
                Loading.hide()
                return {kind: "ok", data: response.data}
            }else{
                Loading.hide()
                return {kind: "bad-data", data: response.data}
            }
        } catch (error) {
            Loading.hide()
            return {kind: "bad-data"}
        }
    };
}