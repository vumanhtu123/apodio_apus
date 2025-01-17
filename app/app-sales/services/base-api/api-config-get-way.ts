import { ApiResponse, ApisauceInstance, create } from "apisauce";
import DeviceInfo from "react-native-device-info";
import {
  ApiConfig,
  DEFAULT_API_CONFIG_GET_WAY,
  DEFAULT_API_CONFIG_UAA,
} from "./api-config";
import { resetRoot } from "../../navigators";
import { getAccessToken, getTenantId } from "../../utils/storage";
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../../components/dialog-notification";


export class GetWayAPI {
  apisauce!: ApisauceInstance;

  config: ApiConfig;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG_GET_WAY) {
    this.config = config;
  }

  async setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });
    console.log("apisauceGETWAY", this.config.url);
    this.apisauce.axiosInstance.interceptors.response.use(
      async (response) => {
        Loading.hide();
        console.log("RESPONSE :", response);
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
        console.log("error ", error.response.status);
        if (error.response.status === 401) {
          console.log("401 authentication");
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
          "Accept-Language": "en",
          "X-TenantId": tenantId,
        };
        const token = await getAccessToken();
        if (token) {
          request.headers!.Authorization = "Bearer " + token;
        }
        console.log("REQUEST--GATEWAY: ", request);
      } catch (err) {
        console.log("Catch err", err);
        Loading.hide();
      }
    });
  }
}
