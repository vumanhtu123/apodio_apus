import { ApisauceInstance, create } from "apisauce";
import DeviceInfo from "react-native-device-info";
import { ApiConfig, DEFAULT_API_CONFIG_GET_WAY } from "./api-config";
import { getAccessToken, getDomain, getRefreshToken, getTenantId, setAccessToken, setRefreshToken } from "../../utils/storage";
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../../components/dialog-notification";
import { resetRoot } from "../../navigators";
import { ApiEndpoint } from "./api_endpoint";

/**
 * Manages all requests to the API.
 */
export class ApiRefreshToken {
  private apisauce!: ApisauceInstance;
  private config: ApiConfig;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG_GET_WAY) {
    this.config = config;
    this.setup();
  }

  private setup() {
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });

    // Add interceptors
    this.apisauce.axiosInstance.interceptors.response.use(
      async (response) => {
        Loading.hide();
        console.log("RESPONSE:", response);
        return response;
      },
      async (error) => {
        Loading.hide();
        console.log("ERROR:", error);

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

        return Promise.reject(error);
      }
    );

    // Add request transform
    this.apisauce.addAsyncRequestTransform(async (request) => {
      try {
        const tenantId = await getTenantId();
        const domain = await getDomain();
        
        request.headers = {
          imei: DeviceInfo.getUniqueIdSync() + 2,
          "Accept-Language": "en",
          "X-TenantId": tenantId,
        };
        console.log("REQUEST:", request);
      } catch (err) {
        console.log("Catch error:", err);
        Loading.hide();
      }
    });
    // Add response transform
    this.apisauce.addResponseTransform(async (response) => {
      try {
        if (response) {
          console.log("Transformed response:", response);
        }
      } catch (error) {
        console.log("ERROR:", error);
      }
    });
  }

  async fetchData() {
    try {
        const refreshToken = await getRefreshToken();
        console.log('------refreshToken-------', refreshToken)
        const response = await this.apisauce.post(ApiEndpoint.REFRESH_TOKEN, {
        refreshToken,
        branchId: 0,
        deviceInfo: DeviceInfo.getUniqueIdSync() + 2,
      });
      if (response.data != undefined) {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken)
      }
      console.log("-------refreshToken response:------", JSON.stringify(response));
      return response.data;
    } catch (error) {
      console.log("Error fetching data:", error);
      throw error;
    }
  }
}
