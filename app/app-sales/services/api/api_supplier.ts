

import { ApiResponse } from "apisauce";
import { Loading } from "../../../components/dialog-notification";
import { ApiSupplier } from "../base-api/api-config-supplier"
import { DataSupplierGroup } from "../../models/supplier-store/supplier-group-model";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { DataSupplier } from '../../models/supplier-store/supplier-model';
export class SupplierApi {
    private api: ApiSupplier;

    constructor(api: ApiSupplier) {
        this.api = api
    }

    async getListSupplierGroup(
        size: number,
        page: number,
        search: string,
        sort?: string,
        isLoadMore?: boolean

    ): Promise<any> {
        console.log("set value loadMore", isLoadMore);

        if (!isLoadMore) {
            Loading.show({
                text: "Loading...",
            });
        }

        try {
            console.log('doandev url supplier group', this.api.config.url)
            const response: ApiResponse<BaseResponse<DataSupplierGroup, ErrorCode>> = await this.api.apisauce.get(
                ApiEndpoint.GET_LIST_SUPPLIER,
                {
                    size: size,
                    page: page,
                    search: search,
                    sort: sort
                }
            )

            const result = response.data;
            console.log("My data Supplier", result);
            Loading.hide()
            if (result?.data != null) {
                return result
            } else {
                return result?.errorCodes
            }

        } catch (error) {
            Loading.hide();
            return { kind: "bad-data", result: error }
        }
    }

    async getListSupplier(
        page: number,
        size: number,
        search: string,
        isLoadMore: any
    ) {
        if (!isLoadMore) {
            Loading.show({
                text: "Loading..."
            });
        }

        try {

            console.log('doandev url supplier', this.api.config.url)
            const response: ApiResponse<BaseResponse<DataSupplier, ErrorCode>> =
                await this.api.apisauce.get(
                    ApiEndpoint.GET_LIST_SUPPLIER_GROUP,
                    {
                        page: page,
                        size: size,
                        search: search,
                        isLoadMore: isLoadMore
                    }
                )
            const results = response.data

            console.log("MyData supplier group", results);
            Loading.hide()
            if(results != null){
                return results
            }else{
                return results
            }


        } catch (error) {
            Loading.hide()
            console.log("Error Get List Supplier",error);
            
        }

    }


}