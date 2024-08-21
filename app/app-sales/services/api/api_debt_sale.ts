import { ApiResponse } from "apisauce";
import { Loading } from "../../../components/dialog-notification";
import { ApiDebtSales } from "../base-api/api_config-debt-sale";
import { ApiEndpoint } from "../base-api/api_endpoint";

export class DebtApi {
    private api: ApiDebtSales ;

    constructor(api: ApiDebtSales){
        this.api = api
    }

    async getListDebtSale (
        page: number,
        size: number,
        search: string,
        isLoadMore: boolean,
    ): Promise<any> {
            if (!isLoadMore){
                Loading.show({
                    text:"Loading..."
                });
            }
            try {
                const response: ApiResponse<BaseResponse<DataDebt,ErrorCode>> =await this.api.apisauce.get(
                    ApiEndpoint.GET_LIST_DEBT_SALE,{
                        page: page,
                        size: size,
                        search: search,
                        isLoadMore: isLoadMore
                    }
                )
                Loading.hide();
                const result = response.data
                if (result?.data !== null) {
                    return result
                }else{
                    return result.errorCodes
                }
            } catch (error) {
                Loading.hide();
                return {kind: "bad-data-Debt-Sale", result: error}
            }
    }
}