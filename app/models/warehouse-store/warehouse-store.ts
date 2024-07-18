import { values } from 'mobx';
import { flow, types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { WarehouseAPI } from "../../services/api/api-warehouse";
import { ResponseWarehouse } from "./warehouse-model";
import { reset } from 'i18n-js';
import { boolean } from 'mobx-state-tree/dist/internal';

export const WarehouseStoreModal = types
    .model("WarehouseStore")
    .props({
        isLoadMoreWarehouse: types.optional(types.boolean, false)
    })
    .extend(withEnvironment)
    .views(self => ({}))
    .actions((self) => ({
        setIsLoadMoreWarehouse(value: any) {
            console.log("doanlog value isLoadMore warehouse", value);
            self.isLoadMoreWarehouse = value;
        },
        // reset(){
        //     self.isLoadMoreWarehouse = false
        // }
    }))
   
    .actions((self) => ({

        getListWareHouse: flow(function* (
            page?: number,
            size?: number,
            state?: string,
            search?: string,
            isLoadMore?: boolean

        ) {
            try {
                const warehouseAPI = new WarehouseAPI(self.environment.apiWarehouse)
                const result: BaseResponse<ResponseWarehouse, ErrorCode> =
                    yield warehouseAPI.getListWarehouse(
                        page ?? 0,
                        size ?? 0,
                        state ?? "",
                        search ?? "",
                        isLoadMore ?? true
                    )
                console.log(
                    "WarehouseResult1111-------------",
                    JSON.stringify(result.data)
                );

                return result.data
            } catch (error) {
                console.log("Get list warehouse error", error);

            }
        })
    }))