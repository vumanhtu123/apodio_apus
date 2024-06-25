import { PriceList } from "./../../screens/order/components/header-order";
import { ClientSlected } from "./../order-list-select-clien-model";
import { flow, types, applySnapshot } from "mobx-state-tree";
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
import { SelectClientAPI } from "../../services/api/api_selectClient";
import { OderListResponse } from "../order-list-select-clien-model";
import {
  OrderCityResult,
  OrderDistrictResult,
  OrderListAddressResult,
  OrderWardResult,
  Root1,
} from "./entities/order-address-model";
import { SelectPriceListAPI } from "../../services/api/api-select-price-list";
import {
  PriceListResponse,
  PriceListSelect,
} from "../select-price-list/select-price-list.-model";
import { TaxLineModel } from "./entities/order-tax-lines-model";
import { DebtModel } from "./entities/order-debt-limit-model";
import {
  OrderVariantResult,
  PriceVariantResult,
} from "./entities/order-variant-model";
import { TaxModel } from "./entities/order-tax-model";
import { Loading } from "../../components/dialog-notification";
import { HomeApi } from "../../services/api/api-home";

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
    dataProductAddOrder: types.optional(types.array(types.frozen()), []),
    //dataProductAddOrder: types.optional(types.array(types.frozen<never>()), []),
    checkPriceList: types.optional(types.boolean, false),
    sortCreateClient: types.optional(types.string, ""),
    search: types.optional(types.string, ""),
    checkIdPartner: types.optional(types.boolean, false),
    sort: types.optional(types.array(types.string), []),
    isLoadMore: types.optional(types.boolean, false),
    productId: types.optional(types.number, 0),
    viewProductType: types.optional(types.string, "VIEW_PRODUCT"),
    viewGrid: types.optional(types.boolean, true),
    orderId: types.optional(types.number, 0),
    tagId: types.optional(types.array(types.number), []),
    productCategoryId: types.optional(types.number, 0),
    nameCategory: types.optional(types.string, ""),
    checkRenderList: types.optional(types.boolean, false),
    isLoadMoreSelectClient: types.optional(types.boolean, false),
    clearingDebt: types.optional(types.boolean, false),
    dataAddress: types.optional(types.frozen<Root1>(), {id: 0, partnerId: 0,
      phoneNumber: '',
      addressType: '',
      country: {id: 0, name: ''},
      region: {id: 0, name: ''},
      city: {id: 0, name: ''},
      district: {id: 0, name: ''},
      ward: {id: 0, name: ''},
      address: '',
      isDefault: false,}),
    dataClientSelect: types.optional(types.frozen<ClientSlected>(), {
      id: "",
      name: "",
      code: "",
      phoneNumber: "",
    }),
    sortPriceList: types.optional(types.string, ""),
    dataPriceListSelected: types.optional(types.frozen<PriceListSelect>(), {
      id: "",
      name: "",
      priceListCategory: "",
      currencyId: "",
      pricelistId: "",
    }),
    dataDebtLimit: types.optional(types.frozen<any>(), {
      isHaveDebtLimit: false,
      debtAmount: 0,
      amountOwed: 0,
    }),
    dataDebtPayment: types.optional(types.frozen<any>(), {
      sumAll: 0,
      methodPayment: '',
      debt: 0,
      inputPrice: 0,
      apply: false,
    }),
    
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
      self.productCategoryId = value;
    },
    setCheckRenderList(value: any) {
      self.checkRenderList = value;
    },
    setNameCategory(value: any) {
      self.nameCategory = value;
    },
    setCheckPriceList(value: any) {
      self.checkPriceList = value;
    },
    setDataProductAddOrder(value: any) {
      self.dataProductAddOrder = value;
    },
    setCheckIdPartner(value: boolean) {
      self.checkIdPartner = value;
    },
    setClearingDebt(value: boolean) {
      self.clearingDebt = value;
    },
    setDataAddress(value: any) {
      self.dataAddress = value;
    },
    setIsLoadMore(isLoadMore: boolean) {
      self.isLoadMore = isLoadMore;
    },
    setMethodPayment(value: any) {
      self.dataDebtPayment = value;
    },
    setOrderId(id: number) {
      self.orderId = id;
    },
    setDataClientSelect(value: any) {
      self.dataClientSelect = value;
    },
    setDataDebtLimit(value: any) {
      self.dataDebtLimit = value;
    },
    setSortPriceList(sort: any) {
      self.sortPriceList = sort;
    },

    // chú ý phải clear khi xong
    setDataPriceListSelect(value: any) {
      console.log("doanlog", value);
      self.dataPriceListSelected = value;
    },

    setIsLoadMoreSelectClient(value : any){
      console.log("doanlog value isLoadMore Select Client", value);
      self.isLoadMoreSelectClient = value 
    },
    clearTaxValueAndTaxesInput(){
      const updatedItems = self.dataProductAddOrder.map(item => {
        return { ...item, taxValue: undefined, taxesInput: undefined, addInputTaxes:undefined, addTaxes:undefined, undefined, amountTotal: undefined, VAT: undefined};
      });
      console.log('----updatedItems---', JSON.stringify(updatedItems))
      applySnapshot(self.dataProductAddOrder, updatedItems);
      //this.setDataProductAddOrder(updatedItems);
      console.log('----updatedItems222222---', JSON.stringify(self.dataProductAddOrder))
    },
    reset() {
      self.isModalTracking = false;
      self.dataFatherStatus.clear();
      self.fatherStatus = { id: "", label: "" };
      self.dataChildStatus.clear();
      self.childStatus = { id: "", label: "" };
      self.dataProductAddOrder.clear();
      self.checkPriceList = false;
      self.sortCreateClient = "";
      self.search = "";
      self.checkIdPartner = false;
      self.sort.clear();
      self.isLoadMore = false;
      self.productId = 0;
      self.viewProductType = "VIEW_PRODUCT";
      self.viewGrid = true;
      self.orderId = 0;
      self.tagId.clear();
      self.productCategoryId = 0;
      self.nameCategory = "";
      self.checkRenderList = false;
      self.dataAddress = {
        id: 0,
        partnerId: 0,
        phoneNumber: '',
        addressType: '',
        country: { id: 0, name: '' },
        region: { id: 0, name: '' },
        city: { id: 0, name: '' },
        district: { id: 0, name: '' },
        ward: { id: 0, name: '' },
        address: '',
        isDefault: false,
      };
      self.dataClientSelect = {
        id: "",
        name: "",
        code: "",
        phoneNumber: "",
      };
      self.sortPriceList = "";
      self.dataPriceListSelected = {
        id: "",
        name: "",
        priceListCategory: "",
        currencyId: "",
        pricelistId: "",
      };
      self.dataDebtLimit = {
        isHaveDebtLimit: false,
        debtAmount: 0,
        amountOwed: 0,
      };
      self.dataDebtPayment = {
        sumAll: 0,
        methodPayment: 0,
        debt: 0,
        inputPrice: 0,
        apply: false,
      };
    },
  }))
  .actions((self) => ({
    getListOrder: flow(function* (
      page: number,
      size: number,
      state: string,
      search: string,
      fromCreateDate,
      toCreateDate
    ) {
      console.log("page", page);
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      const result: OrderResult = yield orderApi.getListOrder(
        page,
        size,
        state,
        search,
        fromCreateDate,
        toCreateDate
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
      search: string,
      b2cActivated: boolean,
      isLoadMore: boolean,
    ) {
      try {
        const clientAPI = new SelectClientAPI(self.environment.apiErp);
        const result: BaseResponse<OderListResponse, ErrorCode> =
          yield clientAPI.getListSelectClient(
            page,
            size,
            sort,
            search,
            b2cActivated,
            isLoadMore
          );
        console.log(
          "SlectClientResult-------------",
          JSON.stringify(result.data)
        );
        return result.data;
      } catch (error) {
        console.log("Get list info company", error);
      }
    }),

    getListPriceList: flow(function* (
      page: number,
      size: number,
      sort: string,
      search: string
    ) {
     
      try {
        console.log("SlectPriceList-------------", );
        const PriceListAPI = new SelectPriceListAPI(self.environment.api);
        // const result: BaseResponse<PriceListResponse, ErrorCode> =
        const result: any =
          yield PriceListAPI.getSelectPriceListAPI(page, size, sort, search);
        console.log("SlectPriceList-------------", JSON.stringify(result.data));
        return result.data;
      } catch (error) {
        console.log("Get list SlectPriceList error", error);
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
        console.log("order 2", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getPriceOrderVariant: flow(function* (value: any) {
      // console.log('page' , page)
      const orderApi = new ProductApi(self.environment.api);
      const result: PriceVariantResult = yield orderApi.getPriceOrderVariant(
        value
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
      countryId: number
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
      const orderApi = new VendorApi(self.environment.apiErp);
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
      const orderApi = new VendorApi(self.environment.apiErp);
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
      const result: CreateAddressResult = yield orderApi.createAddress(value);
      // console.log('resulttt' , result)
      if (result.kind === "ok") {
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getListAccountLedger: flow(function* () {
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      const result = yield orderApi.getListAccountLedger();
      // console.log("-----------dsa", result);
      if (result.kind === "ok") {
        console.log("order", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getDebtAccountLedger: flow(function* (accountLedgerId: number, start: string, end: string, customerId: number) {
      console.log("page", accountLedgerId);
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      const result = yield orderApi.getDebtAccountLedger(accountLedgerId, start, end, customerId);
      // console.log("-----------dsa", result);
      if (result.kind === "ok") {
        console.log("order", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getBalanceLimit: flow(function* (partnerId: number) {
      console.log("page", partnerId);
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount,
      );
      const result = yield orderApi.getBalanceLimit(partnerId);
      // console.log("-----------dsa", result);
      if (result.kind === "ok") {
        console.log("order", result);
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
      // console.log("-----------dsa", result);
      if (result.kind === "ok") {
        console.log("order", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getPayment: flow(function* (page: number, size: number) {
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      const result: OrderResult = yield orderApi.getPaymentTerm(page, size);
      if (result.kind === "ok") {
        console.log("order payment", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getDetailInvoice: flow(function* (id: number) {
      console.log("page", id);
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      const result: OrderResult = yield orderApi.getDetailInvoice(id);
      // console.log('-----------dsa', result.response.errorCodes)

      if (result.kind === "ok") {
        console.log("order", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    createInvoice: flow(function* (invoiceAdd: any) {
      console.log("dataaaaaa", JSON.stringify(invoiceAdd));
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      const result: OrderResult = yield orderApi.createInvoice(invoiceAdd);
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
    cancelOrder: flow(function* (id: number) {
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      try {
        const result: BaseResponse<OrderResult, ErrorCode> = yield orderApi.cancelOrder(
          id
        );
        console.log("tuvm getTax result", JSON.stringify(result));
        if (result.kind === 'ok') {
          return result;
        } else {
          return result;
        }
      } catch (err) {
        console.log(err);
      }
    }),
    stateAllow: flow(function* (id: number) {
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      try {
        const result: BaseResponse<any, ErrorCode> = yield orderApi.stateAllow(
          id
        );
        console.log("mmm result", JSON.stringify(result));
        if (result.data !== null) {
          console.log(" success", result);
          return result;
        } else {
          return result.errorCodes;
        }
      } catch (err) {
        console.log(err);
      }
    }),
    getDebtLimit: flow(function* (partnerId: any) {
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      try {
        const result: BaseResponse<DebtModel, ErrorCode> =
          yield orderApi.getDebtLimit(partnerId);
        if (result.data !== null) {
          console.log("tuvm getDebt success");
          return result.data;
        } else {
          return result.errorCodes;
        }
      } catch (err) {
        console.log(err);
      }
    }),

    postTaxLine: flow(function* (dataForm: any) {
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      console.log("data form:", dataForm);
      try {
        const result: BaseResponse<TaxLineModel, ErrorCode> =
          yield orderApi.postTaxLines(dataForm);
        if (result.data !== null) {
          return result.data.taxLines;
        } else {
          return result.errorCodes;
        }
      } catch (err) {
        console.log(err);
      }
    }),

    postAddOrderSale: flow(function* (form: any) {
      const orderApi = new OrderApi(
        self.environment.apiOrder,
        self.environment.apiAccount
      );
      try {
        const result: BaseResponse<any, ErrorCode> =
          yield orderApi.postNewOrder(form);
        if (result.data !== undefined) {
          return result.data;
        } else {
          console.log("ok");
          return result.errorCodes;
        }
      } catch (err) {
        console.log(err);
      }
    }),
  }));
