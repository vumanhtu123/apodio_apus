import { size } from 'lodash';
import { flow, types } from "mobx-state-tree";
import { Environment } from "../environment";
import { withEnvironment } from "../extensions/with-environment";
import { DebtApi } from '../../services/api/api_debt_sale';

export const DebtStoreModal = types
.model("DebtStoreModal")
.props({

})
.extend(withEnvironment)
.views((self) => ({}))
.actions((self) => ({

}))
.actions((self) => ({
    getListDebt: flow(function* (
        page: number,
        size: number,
        search: string,
        isLoadMore: boolean,
    ) {
        try {
                const debtApi = new DebtApi(
                    self.environment.apiDebtSales,  
                )
                const result:BaseResponse<DataDebt,ErrorCode> = 
                yield debtApi.getListDebtSale(
                    page,
                    size,
                    search,
                    isLoadMore
                );
                console.log(
                    "DebtSales---------------------------",
                    result.data
                );
                return result.data   
        } catch (error) {
                console.log("Get list debt error" , error);          
        }

    })
})) 
