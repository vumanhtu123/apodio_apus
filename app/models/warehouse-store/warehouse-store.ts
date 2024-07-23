import { id } from "date-fns/locale";
import { values } from "mobx";
import { flow, types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { WarehouseAPI } from "../../services/api/api-warehouse";
import { reset } from "i18n-js";
import { ResponseWarehouse } from "./warehouse-model";
import { DataDetailWarehouse } from "./detail-warehouse-model";
import { UnitResult } from "../unit/unit-model";

export const WarehouseStoreModal = types
  .model("WarehouseStore")
  .props({
    isLoadMoreWarehouse: types.optional(types.boolean, false),
  })
  .extend(withEnvironment)
  .views((self) => ({}))
  .actions((self) => ({
    setIsLoadMoreWarehouse(value: any) {
      console.log("doanlog value isLoadMore warehouse", value);
      self.isLoadMoreWarehouse = value;
    },
    reset() {
      self.isLoadMoreWarehouse = false;
    },
  }))

  .actions((self) => ({
    getListWareHouse: flow(function* (
      page?: number,
      size?: number,
      state?: string,
      search?: string,
      isLoadMore?: boolean
    ) {
      try {
        const warehouseAPI = new WarehouseAPI(
          self.environment.apiWarehouse,
          self.environment.api
        );
        const result: BaseResponse<ResponseWarehouse, ErrorCode> =
          yield warehouseAPI.getListWarehouse(
            size,
            page,
            search,
            state,
            isLoadMore
          );
        console.log(
          "WarehouseResult-------------",
          JSON.stringify(result.data)
        );

        return result.data;
      } catch (error) {
        console.log("Get list warehouse error", error);
      }
    }),

    getDetailWarehouse: flow(function* (id: number) {
      try {
        const warehouseAPI = new WarehouseAPI(
          self.environment.apiWarehouse,
          self.environment.api
        );
        const result: BaseResponse<DataDetailWarehouse, ErrorCode> =
          yield warehouseAPI.getDetailWarehouse(id);
        console.log("WarehouseDetail------------- ", JSON.stringify(result));

        return result;
      } catch (error) {
        console.log("Get detail warehouse error", error);
      }
    }),

    postCreateWareHouse: flow(function* (form: any) {
      try {
        const warehouseAPI = new WarehouseAPI(
          self.environment.apiWarehouse,
          self.environment.api
        );
        const result: BaseResponse<any, ErrorCode> =
          yield warehouseAPI.createWareHouse(form);
        console.log("Warehouse_Create-------------", JSON.stringify(result));
        if (result?.data != null) {
          return result;
        } else {
          return result.errorCodes;
        }
      } catch (error) {
        console.log("post warehouse error", error);
      }
    }),

    putUpdateWareHouse: flow(function* (form: any, id: any) {
      try {
        const warehouseAPI = new WarehouseAPI(
          self.environment.apiWarehouse,
          self.environment.api
        );
        const result: BaseResponse<any, ErrorCode> =
          yield warehouseAPI.updateWareHouse(form, id);
        console.log(
          "Warehouse_Update-------------",
          JSON.stringify(result.data)
        );
        if (result?.data != null) {
          return result;
        } else {
          return result.errorCodes;
        }
      } catch (error) {
        console.log("update warehouse error", error);
      }
    }),

    deleteWarehouse: flow(function* (id: number) {
      try {
        const warehouseAPI = new WarehouseAPI(
          self.environment.apiWarehouse,
          self.environment.api
        );
        const result: BaseResponse<any, ErrorCode> =
          yield warehouseAPI.deleteWarehouse(id);
        console.log(
          "Warehouse_Delete------------",
          JSON.stringify(result.message)
        );
        if (result.message != null) {
          return result;
        } else {
          return result.errorCodes;
        }
      } catch (error) {
        console.log("delete warehouse error", error);
      }
    }),

    getListUnit: flow(function* () {
      try {
        const warehouseAPI = new WarehouseAPI(
          self.environment.apiWarehouse,
          self.environment.api
        );
        const result: UnitResult = yield warehouseAPI.getListUnit();
        return result;
      } catch (error) {
        console.log("LOG ERROR PROMOTION", error);
        return error;
      }
    }),
  }));
