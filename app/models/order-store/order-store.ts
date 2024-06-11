import { flow, types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { InputSelectModel, OrderResult } from "./entities/order-store-model";
import {
  CreateAddressResult,
  OrderProductResult,
} from "./entities/order-product-model";
import { OrderApi } from "../../services/api/api_oder";
import { VendorApi } from "../../services/api/api-vendor";
import { AddClientAPI } from "../../services/api/api-add-client";
import { SelectClienAPI } from "../../services/api/api_selectClient";
import { OderListResspose } from "../order-list-select-clien-model";
import { AddressApi } from "../../services/api/api_address";
import {
  OrderCityResult,
  OrderDistrictResult,
  OrderListAddressResult,
  OrderWardResult,
} from "./entities/order-address-model";
import { OrderVariantResult } from "./entities/order-variant-model";
import { TaxModel, Content } from "./entities/order-tax-model";

export const OrderStoreModel = types
  .model("OderStore")
  .props({
    isModalTracking: types.optional(types.boolean, false),
    dataFatherStatus: types.optional(
      types.array(types.frozen<InputSelectModel>()),
      []
    ),
    fatherStatus: types.optional(types.frozen<InputSelectModel>(), {
      id: "",
      label: "",
    }),
    dataChildStatus: types.optional(
      types.array(types.frozen<InputSelectModel>()),
      []
    ),
    childStatus: types.optional(types.frozen<InputSelectModel>(), {
      id: "",
      label: "",
    }),
    dataProductAddOrder: types.optional(types.array(types.frozen<never>()), []),
    dataProductAddOrderNew: types.optional(
      types.array(types.frozen<never>()),
      []
    ),
    checkPriceList: types.optional(types.boolean, false),
    sortCreateClient: types.optional(types.string, ""),
    search: types.optional(types.string, ""),
    reloadAddressScreen: types.optional(types.boolean, false),
    sort: types.optional(types.array(types.string), []),
    isLoadMore: types.optional(types.boolean, false),
    productId: types.optional(types.number, 0),
    viewProductType: types.optional(types.string, "VIEW_PRODUCT"),
    viewGrid: types.optional(types.boolean, true),
    orderId: types.optional(types.number, 0),
    dataClientSelect: types.optional(types.string, ""),
  })
  .extend(withEnvironment)
  .views((self) => ({}))
  .actions((self) => ({
    setFatherStatus(value: InputSelectModel) {
      self.fatherStatus = value;
    },
    setChildStatus(value: InputSelectModel) {
      self.childStatus = value;
    },
    openModalTracking() {
      self.isModalTracking = true;
    },
    closeModalTracking() {
      self.isModalTracking = false;
    },
    setViewProductType(viewProductType: string) {
      self.viewProductType = viewProductType;
    },
    setViewGrid(viewGird: boolean) {
      self.viewGrid = viewGird;
    },
    setSearch(search: any) {
      self.search = search;
    },
    setSortCreateClient(sort: any) {
      self.sortCreateClient = sort;
    },
    setSelectedProductId(productId: number) {
      self.productId = productId;
    },
    setSort(sort: any) {
      self.sort = sort;
    },
    setCheckPriceList(value: any) {
      self.checkPriceList = value;
    },
    setDataProductAddOrder(value: any) {
      self.dataProductAddOrder = value;
    },
    setReloadAddressScreen(value: boolean) {
      self.reloadAddressScreen = value;
    },
    setDataProductAddOrderNew(value: any) {
      self.dataProductAddOrderNew = value;
    },
    setIsLoadMore(isLoadMore: boolean) {
      self.isLoadMore = isLoadMore;
    },
    setOrderId(id: number) {
      self.orderId = id;
    },
    setDataClientSelect(value: any) {
      self.dataClientSelect = value;
    },
  }))
  .actions((self) => ({
    getListOrder: flow(function* (page: number, size: number) {
      console.log("page", page);
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      const result: OrderResult = yield orderApi.getListOrder(page, size);
      console.log("-----------dsa", result);
      if (result.kind === "ok") {
        console.log("order", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),

    getListSelectClient: flow(function* (
      page: number,
      size: number,
      sort: string,
      search: string
    ) {
      try {
        const clientAPI = new SelectClienAPI(self.environment.apiErp);
        const result: BaseResponse<OderListResspose, ErrorCode> =
          yield clientAPI.getListSelectClient(page, size, sort, search);
        console.log(
          "SlectClientResult-------------",
          JSON.stringify(result.data)
        );
        return result.data;
      } catch (error) {
        console.log("Get list info company", error);
      }
    }),

    postClient: flow(function* (clientData) {
      const client = new AddClientAPI(self.environment.apiErp);
      const result = yield client.createClient(clientData);
      if (result.kind === "ok") {
        return result;
      } else {
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
      isLoadMore: boolean,
      warehouseId: number
    ) {
      // console.log('page' , page)
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
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
      console.log("-----------dsa", result);
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
      isLoadMore: boolean,
      warehouseId: number,
      productTemplateId: number
    ) {
      // console.log('page' , page)
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      const result: OrderVariantResult = yield orderApi.getListOrderVariant(
        page,
        size,
        productCategoryId,
        search,
        // tagId,
        sortId,
        isLoadMore,
        warehouseId,
        productTemplateId
      );
      console.log("-----------dsa", result);
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
      isLoadMore: boolean,
      warehouseId: number,
      priceListId: number
    ) {
      // console.log('page' , page)
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      const result: OrderProductResult =
        yield orderApi.getListOrderProductPrice(
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
      console.log("-----------dsa", result);
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
      isLoadMore: boolean,
      warehouseId: number,
      productTemplateId: number,
      priceListId: number
    ) {
      // console.log('page' , page)
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      const result: OrderVariantResult =
        yield orderApi.getListOrderVariantPrice(
          page,
          size,
          productCategoryId,
          search,
          // tagId,
          sortId,
          isLoadMore,
          warehouseId,
          productTemplateId,
          priceListId
        );
      console.log("-----------dsa", result);
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
      // regionId: number,
      regionId: number
    ) {
      // console.log('page' , page)
      const orderApi = new AddressApi(self.environment.apiAddress);
      const result: OrderCityResult = yield orderApi.getListCity(
        page,
        size,
        search,
        countryId
        // regionId,
      );
      console.log("-----------dsa", result);
      if (result.kind === "ok") {
        console.log("order", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getListDistrict: flow(function* (
      page: number,
      size: number,
      search: string,
      cityId: number
    ) {
      // console.log('page' , page)
      const orderApi = new AddressApi(self.environment.apiAddress);
      const result: OrderDistrictResult = yield orderApi.getListDistrict(
        page,
        size,
        search,
        cityId
      );
      console.log("-----------dsa", result);
      if (result.kind === "ok") {
        console.log("order", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getListWard: flow(function* (
      page: number,
      size: number,
      search: string,
      districtId: number
    ) {
      // console.log('page' , page)
      const orderApi = new AddressApi(self.environment.apiAddress);
      const result: OrderWardResult = yield orderApi.getListWard(
        page,
        size,
        search,
        districtId
      );
      console.log("-----------dsa", result);
      if (result.kind === "ok") {
        console.log("order", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getListAddress: flow(function* (partnerId: number) {
      // console.log('page' , page)
      const orderApi = new AddressApi(self.environment.apiAddress);
      const result: OrderListAddressResult = yield orderApi.getListAddress(
        partnerId
      );
      console.log("-----------dsa", result);
      if (result.kind === "ok") {
        console.log("order", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    createAddress: flow(function* (value: any) {
      const orderApi = new AddressApi(self.environment.apiAddress);
      const result: CreateAddressResult = yield orderApi.createAddress(value);
      // console.log('resulttt' , result)
      if (result.kind === "ok") {
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getDetailOrder: flow(function* (id: number) {
      console.log("page", id);
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      const result: OrderResult = yield orderApi.getDetailOrder(id);
      console.log("-----------dsa", result);
      if (result.kind === "ok") {
        console.log("order", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getListTax: flow(function* (
      type: string,
      page: number,
      size: number,
      scopeType: string
    ) {
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      try {
        const result: BaseResponse<TaxModel, ErrorCode> =
          yield orderApi.getTaxList(type, scopeType);
        if (result.data !== null) {
          console.log("tuvm getTax success");
          return result.data;
        } else {
          return result.errorCodes;
        }
      } catch (err) {
        console.log(err);
      }
    }),
  }));