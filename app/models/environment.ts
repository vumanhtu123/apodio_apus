// import { ApiOrder } from './../services/base-api/api-config-order';
import { ApiAddress } from "../services/base-api/api-config-address";
import {
  Api,
  ApiErp,
  GetWayAPI,
  ApiUpload,
  ApiOrder,
  ApiAccounting,
} from "../services/api";
import { UAA_API } from "../services/base-api/api-config-uaa";

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
    this.apiAddress = new ApiAddress();
    this.apiAccounting = new ApiAccounting();

    this.apiAccount = new ApiAccounting();
    global.api = new Api();
    global.apiErp = new ApiErp();
    global.apiGetWay = new GetWayAPI();
    global.apiUpload = new ApiUpload();
    global.apiUaa = new UAA_API();
    global.ApiOrder = new ApiOrder();
    global.apiAddress = new ApiAddress();
    global.apiAccount = new ApiAccounting();
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
    await this.apiAddress.setup();
    await this.apiAccounting.setup();

    await this.apiAccount.setup();

    global.api = new Api();
    global.apiErp = new ApiErp();
    global.apiGetWay = new GetWayAPI();
    global.apiUpload = new ApiUpload();
    global.apiUaa = new UAA_API();
    global.ApiOrder = new ApiOrder();
    global.apiAddress = new ApiAddress();
    global.apiAccounting = new ApiAccounting();

    global.apiAccount = new ApiAccounting();
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
  apiAddress: ApiAddress;
}
