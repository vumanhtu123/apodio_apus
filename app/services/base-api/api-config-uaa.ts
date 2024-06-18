import { ApiResponse, ApisauceInstance, create } from "apisauce";
import DeviceInfo from "react-native-device-info";
import {
  ApiConfig,
  DEFAULT_API_CONFIG_GET_WAY,
  DEFAULT_API_CONFIG_UAA,
} from "./api-config";
import { resetRoot } from "../../navigators";
import { getAccessToken, getTenantId } from "../../utils/storage";
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../components/dialog-notification";

const API_PAGE_SIZE = 50;

export class UAA_API {
  apisauce!: ApisauceInstance;

  config: ApiConfig;

  constructor(configGetUaa: ApiConfig = DEFAULT_API_CONFIG_UAA) {
    this.config = configGetUaa;
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
    console.log("apisauceUAA", this.config.url);
    this.apisauce.axiosInstance.interceptors.response.use(
      async (response) => {
        Loading.hide();
        console.log("RESPONSE UAA :", response);
        return response;
      },
      async (error) => {
        Loading.hide();
        console.log("error====", error);
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
        console.log("REQUEST--222UAA: ", request);
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
