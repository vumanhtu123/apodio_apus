import { types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { InputSelectModel } from "./order-store-model";

export const OrderStoreModel = types
  .model("OderStore")
  .props({
    isModalTracking: types.optional(types.boolean, false),
    dataFatherStatus: types.optional(types.array(types.frozen<InputSelectModel>()), []),
    fatherStatus: types.optional(types.frozen<InputSelectModel>(), {id: '', label: ''}),
    dataChildStatus: types.optional(types.array(types.frozen<InputSelectModel>()), []),
    childStatus: types.optional(types.frozen<InputSelectModel>(), {id: '', label: ''}),

    dataProductAddOrder: types.optional(types.array(types.frozen<never>()), []),
    dataProductAddOrderNew: types.optional(types.array(types.frozen<never>()), []),
    checkPriceList: types.optional(types.boolean, false),
  })
  .extend(withEnvironment)
  .views((self) => ({}))
  .actions((self) => ({
    setFatherStatus(value: InputSelectModel){
        self.fatherStatus = value
    },
    setChildStatus(value: InputSelectModel){
        self.childStatus = value
    },
    openModalTracking() {
      self.isModalTracking = true;
    },
    closeModalTracking() {
      self.isModalTracking = false;
    },
    setDataProductAddOrder(value: any) {
      self.dataProductAddOrder = value
    },
    setDataProductAddOrderNew(value: any) {
      self.dataProductAddOrderNew = value
    },
  }))
  .actions((self) => ({}));
