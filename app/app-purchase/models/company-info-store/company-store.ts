import {
    Instance,
    SnapshotIn,
    SnapshotOut,
    flow,
    types,
} from "mobx-state-tree";
import { VendorApi } from "../../services/api/api-vendor";
import { withEnvironment } from "../extensions/with-environment";
import { VendorResult } from "../vendor/vendor-model";

export const CompanyStoreModel = types
    .model("CompanyStore")
    .props({
        companyInfo: types.optional(types.frozen(), {}),
    })

    .extend(withEnvironment)
    .actions((self) => ({
        setCompanyInfo(value: any) {
            self.companyInfo = value;
        },
    }))
    .actions((self) => ({
        getInfoCompany: flow(function* () {
            try {
                const vendorApi = new VendorApi(self.environment.apiErp);
                const result: VendorResult = yield vendorApi.getInfoCompany();
                return result;
            } catch (error) {
                console.log("Get list info company", error);
                return error;
            }
        }),

    }));

export interface CompanyStore extends Instance<typeof CompanyStoreModel> { }
export interface CompanyStoreSnapshotOut
    extends SnapshotOut<typeof CompanyStoreModel> { }
export interface CompanyStoreSnapshotIn
    extends SnapshotIn<typeof CompanyStoreModel> { }
export const createCompanyStoreDefaultModel = () =>
    types.optional(CompanyStoreModel, {});
