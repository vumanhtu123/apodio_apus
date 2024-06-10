import { flow, types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { InputSelectModel, OrderResult } from "./order-store-model";
import { OrderApi } from "../../services/api/api_oder_screen";
import { OrderProductResult } from "./order-product-model";
import { OrderVariantResult } from "./order-variant-model";
import { VendorApi } from "../../services/api/api-vendor";

export const OrderStoreModel = types
  .model("OderStore")
  .props({
    isModalTracking: types.optional(types.boolean, false),
    dataFatherStatus: types.optional(types.array(types.frozen<InputSelectModel>()), []),
    fatherStatus: types.optional(types.frozen<InputSelectModel>(), { id: '', label: '' }),
    dataChildStatus: types.optional(types.array(types.frozen<InputSelectModel>()), []),
    childStatus: types.optional(types.frozen<InputSelectModel>(), { id: '', label: '' }),
    dataProductAddOrder: types.optional(types.array(types.frozen<never>()), []),
    dataProductAddOrderNew: types.optional(types.array(types.frozen<never>()), []),
    checkPriceList: types.optional(types.boolean, false),
    sort: types.optional(types.array(types.string), []),
    isLoadMore : types.optional(types.boolean, false),
    productId: types.optional(types.number, 0),
    viewProductType : types.optional(types.string , "VIEW_PRODUCT"),
    viewGrid: types.optional(types.boolean, true),
    orderId : types.optional(types.number, 0),
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
    setViewProductType (viewProductType : string) {
      self.viewProductType = viewProductType
    },
    setViewGrid(viewGird: boolean) {
      self.viewGrid = viewGird;
    },
    setSelectedProductId(productId: number) {
      self.productId = productId;
    },
    setSort(sort: any) {
      self.sort = sort;
    },
    setCheckPriceList(value: any) {
      self.checkPriceList = value
    },
    setDataProductAddOrder(value: any) {
      self.dataProductAddOrder = value
    },
    setDataProductAddOrderNew(value: any) {
      self.dataProductAddOrderNew = value
    },
    setIsLoadMore (isLoadMore : boolean) {
      self.isLoadMore = isLoadMore
    },
    setOrderId (id : number) {
      self.orderId = id
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
    getListOrderProduct: flow(function* (
      page: number,
      size: number,
      productCategoryId: number,
      search: string,
      // tagId: number,
      sortId: string,
      isLoadMore : boolean,
      warehouseId: number,
    ) {
      // console.log('page' , page)
      const orderApi = new OrderApi(self.environment.apiOrder);
      const result: OrderProductResult = yield orderApi.getListOrderProduct(
        page,
        size,
        productCategoryId,
        search,
        // tagId,
        sortId,
        isLoadMore, 
        warehouseId
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
    getListOrderVariant: flow(function* (
      page: number,
      size: number,
      productCategoryId: number,
      search: string,
      // tagId: number,
      sortId: string,
      isLoadMore : boolean,
      warehouseId: number,
      productTemplateId: number,
    ) {
      // console.log('page' , page)
      const orderApi = new OrderApi(self.environment.apiOrder);
      const result: OrderVariantResult = yield orderApi.getListOrderVariant(
        page,
        size,
        productCategoryId,
        search,
        // tagId,
        sortId,
        isLoadMore, 
        warehouseId,
        productTemplateId,
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
    getListOrderProductPrice: flow(function* (
      page: number,
      size: number,
      productCategoryId: number,
      search: string,
      // tagId: number,
      sortId: string,
      isLoadMore : boolean,
      warehouseId: number,
      priceListId: number,
    ) {
      // console.log('page' , page)
      const orderApi = new OrderApi(self.environment.apiOrder);
      const result: OrderProductResult = yield orderApi.getListOrderProductPrice(
        page,
        size,
        productCategoryId,
        search,
        // tagId,
        sortId,
        isLoadMore, 
        warehouseId,
        priceListId
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
    getListOrderVariantPrice: flow(function* (
      page: number,
      size: number,
      productCategoryId: number,
      search: string,
      // tagId: number,
      sortId: string,
      isLoadMore : boolean,
      warehouseId: number,
      productTemplateId: number,
      priceListId: number,
    ) {
      // console.log('page' , page)
      const orderApi = new OrderApi(self.environment.apiOrder);
      const result: OrderVariantResult = yield orderApi.getListOrderVariantPrice(
        page,
        size,
        productCategoryId,
        search,
        // tagId,
        sortId,
        isLoadMore, 
        warehouseId,
        productTemplateId,
        priceListId,
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
    getListCity: flow(function* (
      page: number,
      size: number,
      search: string,
      countryId: number,
      regionId: number,
    ) {
      // console.log('page' , page)
      const orderApi = new VendorApi(self.environment.apiErp);
      const result: OrderVariantResult = yield orderApi.getListCity(
        page,
        size,
        search,
        countryId,
        regionId,
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
    getDetailOrder: flow(function* (
      id: number,
    ) {
      console.log('page' , id)
      const orderApi = new OrderApi(self.environment.apiOrder);
      const result: OrderResult = yield orderApi.getDetailOrder(
        id
      );
      console.log('-----------dsa' , result.response.errorCodes)
      if (result.kind === "ok") {
        console.log("order", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
  }));
