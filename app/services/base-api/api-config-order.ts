import { ApisauceInstance, create } from "apisauce";
import DeviceInfo from "react-native-device-info";
import { resetRoot } from "../../navigators";
import { getAccessToken, getDomain, getTenantId } from "../../utils/storage";
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../components/dialog-notification";
import { ApiConfig, DEFAULT_API_CONFIG_ORDER } from "./api-config";
import { ApiRefreshToken } from "./api_config_refresh_token";
/**
 * Manages all requests to the API.
 */
export class ApiOrder {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce!: ApisauceInstance;
  /**
   * Configurable options.
   */
  config: ApiConfig;
  private apiRefreshToken: ApiRefreshToken;
  /**
   * Creates the api.
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG_ORDER) {
    this.config = config;
    this.apiRefreshToken = new ApiRefreshToken();
    
  }
  async setup() {
    // construct the apisauce instance
    console.log("apisauceOrder", this.config.url);
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
        console.log("RESPONSEmmmmmmm---setup :", response);
        return response;
      },
      async (error) => {
        Loading.hide();
        console.log("error==1111111", error.config);
        if (error.toJSON().message === "Network Error") {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            button: 'OK',
            textBody: 'Network Error!',
            closeOnOverlayTap: false})
        }
        if (error.response.status === 401) {  
          const originalRequest = error.config;
           // Refresh token logic
          return new Promise((resolve, reject) => {
            this.apiRefreshToken.fetchData().then(response => {
              const newToken = response.accessToken;
              this.apisauce.axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + newToken;
              originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
              return resolve(this.apisauce.axiosInstance.request(originalRequest));
            }).catch(err => {
              reject(err);
              if (err.response && err.response.status === 401) {
                Dialog.show({
                  type: ALERT_TYPE.DANGER,
                  title: 'Error',
                  button: 'OK',
                  textBody: 'Your session was expired',
                  closeOnOverlayTap: false
                });
              }
            });
          }); 
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
        return Promise.reject(error);
      }
      
    );
    this.apisauce.addAsyncRequestTransform((request) => async () => {
      try {
        const tenantId = await getTenantId();
        const domain = await getDomain();
        request.headers = {
          imei: DeviceInfo.getUniqueIdSync() + 2,
          "Accept-Language": "en",
          "X-TenantId": tenantId,
          // "current-domain" : `https://${domain}`
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
