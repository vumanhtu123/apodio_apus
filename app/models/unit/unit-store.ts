import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree"
import { UnitApi } from "../../services/api/api-unit"
import { withEnvironment } from "../extensions/with-environment"
import { UnitResult } from "./unit-model"
import { CreateUnitResult } from "./create-unit-model"
import { CreateUnitGroupLineResult } from "./create_unit-group-line"
import { UnitGroupResult } from "./unit-group-model"
import { DetailUnitGroupResult } from "./deatl-unit-group-model"


export const UnitStoreModel = types
  .model("UnitStore")
  .props({
  })
  .extend(withEnvironment)
  .actions((self) => ({
    getDetailUnitGroup: flow(function* (id: number) {
      try {
        const unitApi = new UnitApi(self.environment.api)
        const result: DetailUnitGroupResult = yield unitApi.getDetailUnitGroup(id)
        return result
      } catch (error) {
        console.log("LOG ERROR PROMOTION", error)
        return error
      }
    }),
    getListUnit: flow(function* () {
      try {
        const unitApi = new UnitApi(self.environment.api)
        const result: UnitResult = yield unitApi.getListUnit()
        return result
      } catch (error) {
        console.log("LOG ERROR PROMOTION", error)
        return error
      }
    }),
    getListUnitGroup: flow(function* () {
      try {
        const unitApi = new UnitApi(self.environment.api)
        const result: UnitGroupResult = yield unitApi.getListUnitGroup()
        return result
      } catch (error) {
        console.log("LOG ERROR PROMOTION", error)
        return error
      }
    }),
    createUnitName: flow(function* (name: string) {
      try {
        const unitApi = new UnitApi(self.environment.api)
        const result: CreateUnitResult = yield unitApi.createUnitName(name)
        return result
      } catch (error) {
        console.log("LOG ERROR PROMOTION", error)
        return error
      }
    }),
    createUnitGroupLine: flow(function* (params: any ) {
      try {
        const unitApi = new UnitApi(self.environment.api)
        const result: CreateUnitGroupLineResult = yield unitApi.createUnitGroupLine(params)
        return result
      } catch (error) {
        console.log("LOG ERROR PROMOTION", error)
        return error
      }
    }),
  }))

export interface UnitStore extends Instance<typeof UnitStoreModel> {}
export interface UnitStoreSnapshotOut extends SnapshotOut<typeof UnitStoreModel> {}
export interface UnitStoreSnapshotIn extends SnapshotIn<typeof UnitStoreModel> {}
export const createUnitStoreDefaultModel = () => types.optional(UnitStoreModel, {})