import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  flow,
  types,
} from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { PaymentApi } from "../../services/api/api-payment";
import moment from "moment";
import { translate } from "../../../i18n";

export const PaymentStoreModel = types
  .model("PaymentStoreModel")
  .props({
    filterListPayment: types.optional(
      types.frozen<{
        dateStart: string;
        dateEnd: string;
        customDate: boolean;
        stringDate: string;
        id: number
      }>(),
      {
        dateStart: moment(new Date()).format("YYYY-MM-DD"),
        dateEnd: moment(new Date()).format("YYYY-MM-DD"),
        customDate: false,
        stringDate: translate("calendar.today"),
        id: 1,
      }
    ),
  })
  .extend(withEnvironment)
  .views((self) => ({}))
  .actions((self) => ({
    setFilterListPayment(value: {
      dateStart: string;
      dateEnd: string;
      customDate: boolean;
      stringDate: string;
      id: number
    }) {
      self.filterListPayment = value;
    },
  }))
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
