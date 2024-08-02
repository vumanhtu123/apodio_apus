import { ApisauceInstance, create } from "apisauce";
import {
  ApiConfig,
  DEFAULT_API_CONFIG_ERP,
  DEFAULT_API_WAREHOUSE,
} from "./api-config";
import { getAccessToken, getTenantId } from "../../utils/storage";
import {
  ALERT_TYPE,
  Dialog,
  Toast,
  Loading,
} from "../../../app-purchase/components/dialog-notification";
import { navigate, resetRoot } from "../../navigators";
import DeviceInfo from "react-native-device-info";
/**
 * Manages all requests to the API.
 */
export class ApiWarehouse {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce!: ApisauceInstance;
  /**
   * Configurable options.
   */
  config: ApiConfig;

  /**
   * Creates the api.
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_WAREHOUSE) {
    this.config = config;
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  async setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });
    console.log("apisauce", this.config.url);
    this.apisauce.axiosInstance.interceptors.response.use(
      async (response) => {
        Loading.hide();
        console.log("doandev1  RESPONSEERP :", response);
        return response;
      },
      async (error) => {
        Loading.hide();
        console.log("error==1", error);
        if (error.toJSON().message === "Network Error") {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            button: "OK",
            textBody: "Network Error!",
            closeOnOverlayTap: false,
          });
        }
        if (error.response.status === 401) {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            button: "OK",
            textBody: "Your session was expired",
            closeOnOverlayTap: false,
            onPressButton: () => {
              resetRoot({
                index: 1,
                routes: [{ name: "authStack" }],
              });
              Dialog.hide();
              Loading.hide();
            },
          });
        }
        if (error.response.status === 500 || error.response.status === 404) {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            button: "OK",
            textBody: "System Busy!",
            closeOnOverlayTap: false,
          });
        }
      }
    );
    this.apisauce.addAsyncRequestTransform((request) => async () => {
      try {
        const tenantId = await getTenantId();
        request.headers = {
          imei: DeviceInfo.getUniqueIdSync() + 2,
          "Accept-Language": "en",
          "X-TenantId": tenantId,
        };
        const token = await getAccessToken();
        if (token) {
          request.headers!.Authorization = "Bearer " + token;
        }
        console.log("REQUEST--222: ", JSON.stringify(request));
      } catch (err) {
        console.log("Catch err", err);
        Loading.hide();
      }
    });
    this.apisauce.addResponseTransform(async (response) => {
      try {
        if (response) {
          console.log("responseUpload", response);
          // if (response.data.errorCodes){
          //   if (response.data.errorCodes[0].code === 4567) {
          //     showDialog(
          //       'Error',
          //       'danger',
          //       `${response.data.errorCodes[0].message}`,
          //       '',
          //       'OK',
          //       () => hideDialog())
          //   }
          // }
        }
      } catch (error) {
        console.log("ERROR", error);
      }
    });
  }
}
