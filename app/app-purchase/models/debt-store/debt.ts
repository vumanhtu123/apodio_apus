import { flow, types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { DebtAPi } from "../../services/api/api_debt";
import { DataTotal } from "./entities/debt-modal";
import { DataMustPay, ResponseDebtResult } from "./entities/debt-must-pay";
import { ApiResponse } from "apisauce";

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
        start: string,
        end: string,
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
            console.log("ListDebtMustPay---------------------------", result);
            
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

    })

}))