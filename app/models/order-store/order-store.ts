import { flow, types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { InputSelectModel, OrderResult } from "./order-store-model";
import { OrderApi } from "../../services/api/api_oder_screen";
import { SelectClienAPI } from "../../services/api/api_selectClient";
import { OderListResspose } from "../order-list-select-clien-model";
import { AddClientAPI } from "../../services/api/api-add-client";
import { translate } from "i18n-js";
import { Dialog } from "../../components/dialog-notification";

export const OrderStoreModel = types
  .model("OderStore")
  .props({
    isModalTracking: types.optional(types.boolean, false),
    dataFatherStatus: types.optional(types.array(types.frozen<InputSelectModel>()), []),
    fatherStatus: types.optional(types.frozen<InputSelectModel>(), { id: '', label: '' }),
    dataChildStatus: types.optional(types.array(types.frozen<InputSelectModel>()), []),
    childStatus: types.optional(types.frozen<InputSelectModel>(), { id: '', label: '' }),
    sort: types.optional(types.string,''),
    search: types.optional(types.string,''),
    
  })
  .extend(withEnvironment)
  .views((self) => ({}))
  .actions((self) => ({
    setFatherStatus(value: InputSelectModel) {
      self.fatherStatus = value
    },
    setChildStatus(value: InputSelectModel) {
      self.childStatus = value
    },
    openModalTracking() {
      self.isModalTracking = true;
    },
    closeModalTracking() {
      self.isModalTracking = false;
    },

    setSearch(search: any) {
      self.search = search
    },
    setSort( sort: any) {
      self.sort = sort
    }

  }))
  .actions((self) => ({
    getListOrder: flow(function* (
      page: number,
      size: number,
    ) {
      console.log('page' , page)
      const orderApi = new OrderApi(self.environment.apiOrder);
      const result: OrderResult = yield orderApi.getListOrder(
        page,
        size,
      );
      console.log('-----------dsa' , result)
      if (result.kind === "ok") {
        console.log("order", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),

    getListSelectClient: flow(function * (page: number, size: number, sort: string , search: string ) {
      try {
        const clientAPI = new SelectClienAPI(self.environment.apiErp)
        const result: BaseResponse<OderListResspose, ErrorCode> = yield clientAPI.getListSelectClient(page,size, sort, search)
        console.log("SlectClientResult-------------",JSON.stringify(result.data))
        return result.data
      } catch (error) {
        console.log("Get list info company", error)
      }
    }),

    postClient: flow(function * (clientData){
      const client = new AddClientAPI(self.environment.apiErp)
      const result = yield client.createClient(clientData)
      if (result.kind === 'ok') {
        return result
      } else {
        return result
    }
    }),
    
  }));
