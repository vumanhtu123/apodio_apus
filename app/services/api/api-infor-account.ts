import { ApiResponse } from "apisauce";
import { hideLoading, showLoading } from "../../utils/toast";
import { ApiErp } from "../base-api/api-config-erp";
import { InforAccount } from "../../models/users-store/infor-account/infor-account-model";
import { ApiEndpoint } from "../base-api/api_endpoint";

export class InforAccountAPI {
    private api : ApiErp

    constructor(api : ApiErp){
        this.api = api
    }

    async getInforAccount (
        id: number
    ):Promise<any> {
        showLoading()
        try {
            const response : ApiResponse<BaseResponse<InforAccount, ErrorCode >> = await this.api.apisauce.get(
                ApiEndpoint.GET_INFOR_ACCOUNT,
                {
                    id : id
                }
            );
            hideLoading();
            const result = response.data;
            if(result?.data != null){
                return result
            }else{
                return result?.errorCodes
            }

        } catch (error) {
            return {kind: "bad-data", result: error};
        }
    }
}