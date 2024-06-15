import { ApisauceInstance, create } from "apisauce";
import DeviceInfo from "react-native-device-info";
import { resetRoot } from "../../navigators";
import { getAccessToken, getTenantId } from "../../utils/storage";
import { hideDialog, hideLoading, showDialog } from "../../utils/toast";
import { ApiConfig, DEFAULT_API_CONFIG_ORDER } from "./api-config";
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

  /**
   * Creates the api.
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG_ORDER) {
    this.config = config;
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
        hideLoading();
        console.log("RESPONSEmmmmmmm :", response);
        return response;
      },
      async (error) => {
        hideLoading();
        console.log("error==", error);
        if (error.toJSON().message === "Network Error") {
          showDialog("Error", "danger", "Network Error!", "", "OK", () =>
            hideDialog()
          );
        }
        if (error.response.status === 401) {
          showDialog(
            "Error",
            "danger",
            "Your session was expired. Please login again to continue using Mosan",
            "",
            "OK",
            () => {
              resetRoot({
                index: 1,
                routes: [{ name: "authStack" }],
              });
              hideDialog();
            }
          );
        }
        if (error.response.status === 500 || error.response.status === 404) {
          console.log("first-----------", error);
          showDialog("Error", "danger", "System Busy!", "", "OK", () =>
            hideDialog()
          );
        }
      }
    );
    this.apisauce.addAsyncRequestTransform((request) => async () => {
      try {
        const tenantId = await getTenantId();
        request.headers = {
          imei: DeviceInfo.getUniqueIdSync() + 2,
          "Accept-Language": "en",
          "X-TenantId": 77,
        };
        const token = await getAccessToken();
        if (token) {
          request.headers!.Authorization = "Bearer " + token;
        }
        console.log("REQUEST--222: ", request);
      } catch (err) {
        console.log("Catch err", err);
        hideLoading();
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
