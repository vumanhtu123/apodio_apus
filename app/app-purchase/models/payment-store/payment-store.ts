import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  flow,
  types,
} from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { PaymentApi } from "../../services/api/api-payment";

export const PaymentStoreModel = types
  .model("PaymentStoreModel")
  .props({})
  .extend(withEnvironment)
  .views((self) => ({}))
  .actions((store) => ({}))
  .actions((self) => ({
    getListPayment: flow(function* () {
      try {
        const paymentApi = new PaymentApi(self.environment.apiAccounting);
        const result: any = yield paymentApi.getPaymentList();
        console.log("getListPayment result: ", result);
        return result;
      } catch (err) {
        console.log("error: ", err);
      }
    }),
  }));

export interface PaymentStoreModel extends Instance<typeof PaymentStoreModel> {}
export interface PaymentStoreModelSnapshotOut
  extends SnapshotOut<typeof PaymentStoreModel> {}
export interface HomeStoreSnapshotIn
  extends SnapshotIn<typeof PaymentStoreModel> {}
export const createProductStoreDefaultModel = () =>
  types.optional(PaymentStoreModel, {});
