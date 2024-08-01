

import { flow, types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { SupplierApi } from "../../services/api/api_supplier";
import { string } from "mobx-state-tree/dist/internal";
import { DataSupplierGroup } from "./supplier-group-model";
import { DataSupplier } from './supplier-model';

export const SupplierStore = types
    .model("SupplierStore")
    .props({

    })
    .extend(withEnvironment)
    .views((self) => ({}))
    .actions((self) => ({

    }))
    .actions((self) => ({
        getListSupplierGroup: flow(function* (
            size: number,
            page: number,
            search: string,
            isLoadMore?: boolean,
            sort?: string
        ) {
            try {
                const listSupplierGroup = new SupplierApi(
                    self.environment.apiSupplier,
                );
                const result: BaseResponse<DataSupplierGroup, ErrorCode>
                    = yield listSupplierGroup.getListSupplierGroup(
                        size,
                        page,
                        search,
                        sort,
                        isLoadMore,
                    )
                console.log(
                    "SupplierGroup------------------------",
                    JSON.stringify(result.data)
                );
                return result.data

            } catch (error) {
                console.log("Get list Error ", error);
            }
        }),

        getListSupplier: flow(function* (
            page: number,
            size: number,
            search: string,
            isLoadMore: any
        ) {
            try {
                const listSupplier = new SupplierApi(
                    self.environment.apiSupplier
                )
                const result: BaseResponse<DataSupplier, ErrorCode> =
                    yield listSupplier.getListSupplier(
                        page,
                        size,
                        search,
                        isLoadMore
                    )
                console.log(
                    "Supplier------------------------",
                    JSON.stringify(result)
                );
                return result

            } catch (error) {
                console.log("Get list supplier error", error);

            }

        })
    }))
