import { Content } from './../brand-model';
import { flow, types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { DebtAPi } from "../../services/api/api_debt";
import { DataTotal } from "./entities/debt-modal";
import { DataMustPay, DataMustPayDebtDetail, ResponseDebtResult } from "./entities/debt-must-pay";
import { ApiResponse } from "apisauce";
import { DataGetIdSentAccounting } from './entities/get-id-sent-accounting-book-model';
import { DataListSelectAccountingBook } from './entities/list-select-accounting-book-model';

export const DebtStoreModal = types
.model("DebtModalStore")
.props({

})
.extend(withEnvironment)
.views((self) => ({}))
.actions((self) =>({

}))
.actions((self) => ({
    getTotalDebt: flow(function*(
        type: string
     ){
        try {
            const debtTotalApi = new DebtAPi(
                self.environment.apiErp,
                self.environment.apiAccounting
            )
            const result : BaseResponse<DataTotal,ErrorCode> = 
                yield debtTotalApi.getTotalDebt(type);
                console.log("-------------TotalDebt", JSON.stringify(result.data));
            
            return result
        } catch (error) {
            console.log("Get total debt error", error);
        }
            
    }),

    getListMustPay: flow(function*(
        size: number,
        page: number,
        search: string,
        type: string,
        debtAmountDesc: boolean,
        start: string | null,
        end: string | null,
        isLoadMore: boolean
    ){
        try {
            const listDebtMustPay = new DebtAPi(
                self.environment.apiErp,
                self.environment.apiAccounting
            )

            const result : ApiResponse<BaseResponse<DataMustPay,ErrorCode>> = yield listDebtMustPay.getListDebtMustPay(
                size,
                page,
                search,
                type,
                debtAmountDesc,
                start,
                end,
                isLoadMore
            )
            console.log("ListDebtMustPay---------------------------", result.data?.data.content);
            
            if(result.data?.data != null){
                return result
            }else{
                return result
            }
            // if(result.kind == "ok"){
            //    return result
            // }else{
            //     console.log("Kind Bad-data List Debt Must Pay", result.kind);
            //     return result
            // }


        } catch (error) {
            console.log("Error List Debt Must Pay", error);
                
        }

    }),

    getDataDebtDetail: flow(function*(
        partnerId: number,
        type: string,
    ){
        try {
            const listDebtMustPay = new DebtAPi(
                self.environment.apiErp,
                self.environment.apiAccounting
            )

            const result : ApiResponse<DataMustPayDebtDetail,ErrorCode> = yield listDebtMustPay.getDebtDetail(
                partnerId,
                type
            )
            console.log("DataDebtMustPayDetail---------------------------", result.data);
            
            if(result?.data != null){
                console.log('====================================');
                console.log("123 doandev");
                console.log('====================================');
                return result
            }else{
                return result
            }
            

        } catch (error) {
            console.log("Error List Debt Must Pay Detail", error);
                
        }

    }),

    getListDebtDetail: flow(function*(
        page: number,
        size: number,
        partnerId: number,
        type:string,
        start: string | null,
        end: string | null,
        debtAmountDesc: boolean,
        search: string | null,
        isLoadMore: boolean
    ){
        try {
            const listDebtMustPay = new DebtAPi(
                self.environment.apiErp,
                self.environment.apiAccounting
            )

            const result : ApiResponse<DataMustPayDebtDetail,ErrorCode> = yield listDebtMustPay.getListDetailDebt(
                        size,
                        page,
                        partnerId,
                        type,
                        start,
                        end,
                        debtAmountDesc,
                        search,
                        isLoadMore
            )
            console.log("DataListDebtDetail---------------------------", result?.data?.data.content);
            
            if(result?.data != null){
                console.log('====================================');
                console.log("123 doandev");
                console.log('====================================');
                return result
            }else{
                return result
            }
            

        } catch (error) {
            console.log("Error List Debt Must Pay Detail", error);
                
        }

    }),

    getValueDebtPay: flow(function*(
        orderId: number,
        moveType: string
    ){
        try {
            const listDebtMustPay = new DebtAPi(
                self.environment.apiErp,
                self.environment.apiAccounting
            )

            const result : ApiResponse<DataMustPayDebtDetail,ErrorCode> = yield listDebtMustPay.getValueDebt(
                orderId,
                moveType,
            )
            console.log("ValueDebtPay---------------------------", result?.data?.data.content);
            
            if(result?.data != null){
                console.log('====================================');
                console.log("123 doandev");
                console.log('====================================');
                return result
            }else{
                return result
            }
            
        } catch (error) {
            console.log("Error List Debt Must Pay Detail", error);
                
        }

    }),

    getIdSentAccountingBook: flow(function*(
        isDefault: boolean,
    ){
        try {
            const listDebtMustPay = new DebtAPi(
                self.environment.apiErp,
                self.environment.apiAccounting
            )

            const result : ApiResponse<DataGetIdSentAccounting,ErrorCode> = yield listDebtMustPay.getIdSentAccountingBook(
                isDefault
            )
            console.log("GetIdSentAccountingBook123---------------------------", result?.data);
            
            if(result?.data != null){
                console.log('====================================');
                console.log("123 doandev");
                console.log('====================================');
                return result
            }else{
                return result
            }
            
        } catch (error) {
            console.log("Error getIdSentAccountingBook", error);
                
        }

    }),

    getListSelectAccountingBook: flow(function*(
        page: number,
        size: number,
        accountLedgerId: number,
        type: string
    ){
        try {
            const listDebtMustPay = new DebtAPi(
                self.environment.apiErp,
                self.environment.apiAccounting
            )

            const result : ApiResponse<DataListSelectAccountingBook,ErrorCode> = yield listDebtMustPay.getListSelectAccountingBook(
                page,
                size,
                accountLedgerId,
                type
            )
            console.log("GetListSelectAccountingBook---------------------------", result?.data);
            
            if(result?.data != null){
                console.log('====================================');
                console.log("123 doandev");
                console.log('====================================');
                return result
            }else{
                return result
            }
            
        } catch (error) {
            console.log("Error getIdSentAccountingBook", error);
                
        }

    }),




}))