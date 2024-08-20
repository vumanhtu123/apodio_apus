

// import { ApiOrder } from './../services/base-api/api-config-order';
import {
  Api,
  ApiErp,
  GetWayAPI,
  ApiUpload,
  ApiOrder,
  ApiAccounting,
  ApiWarehouse,
  ApiSupplier,

} from "../services/api";
import { UAA_API } from "../services/base-api/api-config-uaa";
import { ApiDebtSales } from "../services/base-api/api_config-debt-sale";


let ReactotronDev;
if (__DEV__) {
  const { Reactotron } = require("../services/reactotron");
  ReactotronDev = Reactotron;
}

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  constructor() {
    // create each service
    if (__DEV__) {
      // dev-only services
      this.reactotron = new ReactotronDev();
    }
    this.api = new Api();
    this.apiErp = new ApiErp();
    this.apiGetWay = new GetWayAPI();
    this.apiUpload = new ApiUpload();
    this.apiUaa = new UAA_API();
    this.apiOrder = new ApiOrder();
    this.apiAccounting = new ApiAccounting();
    this.apiWarehouse = new ApiWarehouse();
    this.apiAccount = new ApiAccounting();
    this.apiSupplier = new ApiSupplier();
    this.apiDebtSales = new ApiDebtSales();
    
    global.api = new Api();
    global.apiErp = new ApiErp();
    global.apiGetWay = new GetWayAPI();
    global.apiUpload = new ApiUpload();
    global.apiUaa = new UAA_API();
    global.ApiOrder = new ApiOrder();
    global.apiAccount = new ApiAccounting();
    global.apiWarehouse = new ApiWarehouse();
    global.apiSupplier = new ApiSupplier();
    global.apiDebSales = new ApiDebtSales();
  }

  async setup() {
    // allow each service to setup
    if (__DEV__) {
      await this.reactotron.setup();
    }
    await this.api.setup();
    await this.apiErp.setup();
    await this.apiGetWay.setup();
    await this.apiUpload.setup();
    await this.apiUaa.setup();
    await this.apiOrder.setup();
    await this.apiAccounting.setup();
    await this.apiWarehouse.setup();
    await this.apiAccount.setup();
    await this.apiSupplier.setup();
    await this.apiDebtSales.setup();

    global.api = new Api();
    global.apiErp = new ApiErp();
    global.apiGetWay = new GetWayAPI();
    global.apiUpload = new ApiUpload();
    global.apiUaa = new UAA_API();
    global.ApiOrder = new ApiOrder();
    global.apiAccounting = new ApiAccounting();

    global.apiAccount = new ApiAccounting();
    global.apiWarehouse = new ApiWarehouse();
    global.apiSupplier = new ApiSupplier();
    global.apiDebtSales = new ApiDebtSales();
  }

  /**
   * Reactotron is only available in dev.
   */
  reactotron: typeof ReactotronDev;

  /**
   * Our api.
   */
  api: Api;
  apiUaa: UAA_API;
  apiErp: ApiErp;
  apiAccount: ApiAccounting;
  apiGetWay: GetWayAPI;
  apiUpload: ApiUpload;
  apiAccounting : ApiAccounting;
  apiOrder: ApiOrder;
  apiWarehouse: ApiWarehouse;
  apiSupplier: ApiSupplier;
  apiDebtSales: ApiDebtSales;
}
