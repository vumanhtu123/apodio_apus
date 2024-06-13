import { PriceList } from './../../screens/order/components/header-order';
import { ClientSlected } from './../order-list-select-clien-model';
import { flow, types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { ProductApi } from "../../services/api/api-product";
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
import { OrderCityResult, OrderDistrictResult, OrderListAddressResult, OrderWardResult } from "./entities/order-address-model";
import { number } from 'mobx-state-tree/dist/internal';
import { SelectPriceListAPI } from '../../services/api/api-select-price-list';
import { PriceListResponse, PriceListSelect } from '../select-price-list/select-price-list.-model';
import { OrderVariantResult, PriceVariantResult, TaxModel } from './entities';

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
    orderId : types.optional(types.number, 0),
    tagId: types.optional(types.array(types.number), []),
    productCategoryId: types.optional(types.number, 0),
    nameCategory: types.optional(types.string, ""),
    dataClientSelect: types.optional(types.frozen<ClientSlected>(),{id: '', name: '', code: '', phoneNumber: ''}),
    sortPriceList : types.optional(types.string,''),
    dataPriceListSelected : types.optional(types.frozen<PriceListSelect>(),{id: '', name: '', priceListCategory: ''})

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
    setTagId(tagId: any) {
      self.tagId = tagId;
    },
    setProductCategoryId(value: any) {
      self.productCategoryId = value
    },
    setNameCategory(value: any) {
      self.nameCategory = value
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

    // chú ý phải clear khi xong
    setDataClientSelect(value: any){
      self.dataClientSelect = value
    },
    setSortPriceList(sort: any) {
      self.sortPriceList = sort
    },

    // chú ý phải clear khi xong
    setDataPriceListSelect( value: any){
      console.log('doanlog', value);
      
      self.dataPriceListSelected = value

    }
  }))
  .actions((self) => ({
    getListOrder: flow(function* (
      page: number,
      size: number,
      state: string
    ) {

      console.log('page', page)
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      const result: OrderResult = yield orderApi.getListOrder(
        page,
        size,
        state
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

    getListSelectClient: flow(function* (
      page: number,
      size: number,
      sort: string,
      search: string
    ) {
      try {
        const clientAPI = new SelectClienAPI(self.environment.apiErp)
        const result: BaseResponse<OderListResspose, ErrorCode> = yield clientAPI.getListSelectClient(page, size, sort, search)
        console.log("SlectClientResult-------------", JSON.stringify(result.data))
        return result.data
      } catch (error) {
        console.log("Get list info company", error)
      }
    }),

    getListPriceList: flow(function* (page: number, size: number, sort: string, search: string) {
      try {
        const PriceListAPI = new SelectPriceListAPI(self.environment.api)
        const result: BaseResponse<PriceListResponse, ErrorCode> = yield PriceListAPI.getSelectPriceListAPI(page, size, sort, search)
        console.log("SlectPriceList-------------", JSON.stringify(result.data))
        return result.data
      } catch (error) {
        console.log("Get list SlectPriceList error", error)
      }
    }),

    postClient: flow(function* (clientData) {
      const client = new AddClientAPI(self.environment.apiErp)
      const result = yield client.createClient(clientData)
      if (result.kind === 'ok') {
        return result
      } else {
        return result;
      }
    }),

    getListOrderProduct: flow(function* (
      page: number,
      size: number,
      productCategoryId: number,
      search: string,
      tagIds: [],
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
        tagIds,
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
      tagIds: [],
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
        tagIds,
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
    getPriceOrderVariant: flow(function* (
      value: any,
    ) {
      // console.log('page' , page)
      const orderApi = new ProductApi(self.environment.api);
      const result: PriceVariantResult = yield orderApi.getPriceOrderVariant(
        value
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
      tagIds: [],
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
          tagIds,
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
      tagIds: [],
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
          tagIds,
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
      // regionId: number
    ) {
      // console.log('page' , page)
      const orderApi = new VendorApi(self.environment.apiErp);
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
      const orderApi = new VendorApi(self.environment.apiErp);;
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
      const orderApi = new VendorApi(self.environment.apiErp);
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
      const orderApi = new  VendorApi(self.environment.apiErp);
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
      const orderApi = new VendorApi(self.environment.apiErp);
      const result: CreateAddressResult = yield orderApi.createAddress(
        value
      );
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
    getDetailInvoice: flow(function* (
      id: number,
    ) {
      console.log('page', id)
      const orderApi = new OrderApi(self.environment.apiOrder, self.environment.apiAccount);
      const result: OrderResult = yield orderApi.getDetailInvoice(
        id
      );
      // console.log('-----------dsa', result.response.errorCodes)

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
        const result: BaseResponse<TaxModel, ErrorCode> = yield orderApi.getTaxList(type, scopeType);
        console.log("tuvm getTax result", JSON.stringify(result));
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
