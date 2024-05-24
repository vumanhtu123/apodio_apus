import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree"
import { VendorApi } from "../../services/api/api-vendor"
import { withEnvironment } from "../extensions/with-environment"
import { VendorResult } from "./vendor-model"


export const VendorStoreModel = types
  .model("VendorStore")
  .props({
    checkSeparator: types.optional(types.string, ''),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setCheckSeparator(value: any) {
      self.checkSeparator = value
    }
  }))
  .actions((self) => ({
    getListVendor: flow(function* (page: number, size: number, vendorActivated: boolean, search: string) {
      try {
        const vendorApi = new VendorApi(self.environment.apiErp)
        const result: VendorResult = yield vendorApi.getListVendor(page, size, vendorActivated, search)
        console.log("VendorResult-------------",JSON.stringify(result))
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
  }))

export interface VendorStore extends Instance<typeof VendorStoreModel> { }
export interface VendorStoreSnapshotOut extends SnapshotOut<typeof VendorStoreModel> { }
export interface VendorStoreSnapshotIn extends SnapshotIn<typeof VendorStoreModel> { }
export const createVendorStoreDefaultModel = () => types.optional(VendorStoreModel, {})
