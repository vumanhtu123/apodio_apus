import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  flow,
  types,
} from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { HomeApi } from "../../services/api/api-home";

export const HomeStoreModel = types
  .model("HomeStoreModel")
  .props({})
  .extend(withEnvironment)
  .views((self) => ({}))
  .actions((self) => ({
    getListCompany: flow(function* (userId: any) {
      try {
        const homeApi = new HomeApi(
          self.environment.api,
          self.environment.apiUaa,
          self.environment.apiGetWay
        );
        const result: any = yield homeApi.getListCompany(userId);
        console.log("company result: ", result);
        return result.data;
      } catch (err) {
        console.log("error: ", err);
      }
    }),
  }));

export interface HomeStoreModel extends Instance<typeof HomeStoreModel> {}
export interface HomeStoreModelSnapshotOut
  extends SnapshotOut<typeof HomeStoreModel> {}
export interface HomeStoreSnapshotIn
  extends SnapshotIn<typeof HomeStoreModel> {}
export const createProductStoreDefaultModel = () =>
  types.optional(HomeStoreModel, {});
