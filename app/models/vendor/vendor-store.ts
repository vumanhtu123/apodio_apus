import { number } from 'mobx-state-tree/dist/internal';
import { size } from 'lodash';
import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree"
import { VendorApi } from "../../services/api/api-vendor"
import { withEnvironment } from "../extensions/with-environment"
import { VendorResult } from "./vendor-model"
import { CompanyResult } from './companyInfo-model';


export const VendorStoreModel = types
  .model("VendorStore")
  .props({
    checkSeparator: types.optional(types.string, ''),
    sort: types.optional(types.string, ''),
    companyInfo: types.optional(types.frozen(), {}),
  })

  .extend(withEnvironment)
  .actions((self) => ({
    setCheckSeparator(value: any) {
      self.checkSeparator = value
    },
    setSort(sort: any) {
      self.sort = sort;
    },
    setCompanyInfo(value: any) {
      self.companyInfo = value
    }
  }))
  .actions((self) => ({
    getListVendor: flow(function* (page: number, size: number, vendorActivated: boolean, search: string) {
      try {
        const vendorApi = new VendorApi(self.environment.apiErp)
        const result: VendorResult = yield vendorApi.getListVendor(page, size, vendorActivated, search)
        console.log("VendorResult-------------", JSON.stringify(result))
        return result
      } catch (error) {
        console.log("LOG ERROR PROMOTION", error)
        return error
      }
    }),
    getInfoCompany: flow(function* () {
      try {
        const vendorApi = new VendorApi(self.environment.apiErp)
        const result: VendorResult = yield vendorApi.getInfoCompany()
        return result
      } catch (error) {
        console.log("Get list info company", error)
        return error
      }
    }),
    // // getListSelectClient: flow(function * (page: number, size: number, sort: string ) {
    // //   try {
    // //     const clientAPI = new SelectClienAPI(self.environment.apiErp)
    // //     const result: BaseResponse<OderListResspose, ErrorCode> = yield clientAPI.getListSelectClient(page,size, sort)
    // //     console.log("SlectClientResult-------------",JSON.stringify(result.data))
    // //     return result.data
    // //   } catch (error) {
    // //     console.log("Get list info company", error)
    // //   }
    // // }),
    // // postClient: flow(function * (clientData){
    // //   const client = new AddClientAPI(self.environment.apiErp)
    // //   const result = yield client.createClient(clientData)
    // //   if (result.kind === "ok") {
    // //     console.log("post-Client-Success : ", result);
    // //     return result;
    // //   } else {
    // //     console.log("post-Client-Failed : ", result.result.errorCodes);
    // //     return result;
    // //   }
    // }), 

  }))

export interface VendorStore extends Instance<typeof VendorStoreModel> { }
export interface VendorStoreSnapshotOut extends SnapshotOut<typeof VendorStoreModel> { }
export interface VendorStoreSnapshotIn extends SnapshotIn<typeof VendorStoreModel> { }
export const createVendorStoreDefaultModel = () => types.optional(VendorStoreModel, {})
