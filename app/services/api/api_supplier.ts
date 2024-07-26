
import { ApiResponse } from "apisauce";
import { Loading } from "../../components/dialog-notification";
import { ApiSupplier } from "../base-api/api-config-supplier"
import { DataSupplier } from "../../models/supplier-store/supplier-model";
import { ApiEndpoint } from "../base-api/api_endpoint";
export class SupplierApi {
    private api: ApiSupplier;

    constructor(api: ApiSupplier) {
        this.api = api
    }

    async getListSupplier(
        size: number,
        page: number,
        search: string,
        isLoadMore: boolean
    ): Promise<any> {
        if(!isLoadMore){
            Loading.show({
                text: "Loading...",
            });
        }
        
        try {
            console.log('doandev url supplier', this.api.config.url)
            const response: ApiResponse<BaseResponse<DataSupplier,ErrorCode>> = await this.api.apisauce.get(
                ApiEndpoint.GET_LIST_SUPPLIER,
                {
                    size: size,
                    page: page,
                    search: search,
                }
            )

            const result = response.data;
            console.log("My data Supplier", result);
            Loading.hide()
            if (result?.data != null) {
                return result
            }else{
                return result?.errorCodes
            }
            
        } catch (error) {
            Loading.hide();
            return { kind: "bad-data", result : error}
        }
    }
}