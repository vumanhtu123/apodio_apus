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
  }))
  .actions((self) => ({}));
