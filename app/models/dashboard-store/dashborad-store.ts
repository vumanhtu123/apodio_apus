import { flow, types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { action } from "mobx";
import { RevenueThisMonthAPI } from "../../services/api/api-revenue-this-month";
import { RevenueThisMonthResponse } from "./revenue-this-month-model";

export const DashBoardStoreModel = types
.model("DashBoardStore")
.props({

})
.extend(withEnvironment)
.views((self) => ({}))
.actions((self) => ({

}))
.actions((self) => ({
    getDataRevenueThisMonth : flow(function* (
        startDate: string,
        endDate: string
    ){
        try {
            const revenueThisMonth = new RevenueThisMonthAPI(self.environment.apiOrder)
            const result : BaseResponse<RevenueThisMonthResponse, ErrorCode>  = 
            yield revenueThisMonth.getDataRevenueThisMonth(startDate, endDate)
            
            console.log("DashBoardStoreModel-------------", JSON.stringify(result.data))

            return result.data
        } catch (error) {
        console.log("Get data revenue this month ERROR", error)
            
        }
    })
}))


