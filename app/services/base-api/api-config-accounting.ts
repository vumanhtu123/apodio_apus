import { ApisauceInstance, create } from "apisauce";
import DeviceInfo from "react-native-device-info";
import { resetRoot } from "../../navigators";
import { getAccessToken, getTenantId } from "../../utils/storage";
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../components/dialog-notification";
import { ApiConfig, DEFAULT_API_CONFIG_ACCOUNTING } from "./api-config";
/**
 * Manages all requests to the API.
 */
export class ApiAccounting {
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
  constructor(config: ApiConfig = DEFAULT_API_CONFIG_ACCOUNTING) {
    this.config = config;
  }
  async setup() {
    // construct the apisauce instance
    console.log("apisauce accounting", this.config.url);
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });
    this.apisauce.axiosInstance.interceptors.response.use(
      async (response) => {
        Loading.hide();
        console.log("RESPONSE accounting :", JSON.stringify(response));
        return response;
      },
      async (error) => {
        Loading.hide();
        console.log("error==", error);
        if (error.toJSON().message === "Network Error") {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            button: 'OK',
            textBody: 'Network Error!',
            closeOnOverlayTap: false})
        }
        if (error.response.status === 401) {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            button: 'OK',
            textBody: 'Your session was expired',
            closeOnOverlayTap: false,
            onPressButton: () => {
              resetRoot({
                index: 1,
                routes: [{ name: 'authStack' }],
              })
              Dialog.hide();              
              Loading.hide();
            }
          }) 
        }
        if (error.response.status === 500 || error.response.status === 404) {
          console.log("first-----------", error);
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            button: 'OK',
            textBody: 'System Busy!',
            closeOnOverlayTap: false}) 
        }
      }
    );
    this.apisauce.addAsyncRequestTransform((request) => async () => {
      try {
        const tenantId = await getTenantId();
        request.headers = {
          imei: DeviceInfo.getUniqueIdSync() + 2,
          "Accept-Language": "vi",
          "X-TenantId": tenantId,
        };
        const token = await getAccessToken();
        if (token) {
          request.headers!.Authorization = "Bearer " + token;
        }
        console.log("REQUEST--222: ", request);
      } catch (err) {
        console.log("Catch err", err);
        Loading.hide();
      }
    });
    this.apisauce.addResponseTransform(async (response) => {
      try {
        if (response) {
          console.log("responseUpload", response);
        }
      } catch (error) {
        console.log("ERROR", error);
      }
    });
  }
}
