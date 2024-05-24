import { ApisauceInstance, create } from "apisauce";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";
import { getAccessToken } from "../../utils/storage";
import {
  hideDialog,
  hideLoading,
  showDialog,
  showLoading,
  showLoadingT,
} from "../../utils/toast";
import { navigate, resetRoot } from "../../navigators";
import DeviceInfo from "react-native-device-info";
/**
 * Manages all requests to the API.
 */
export class Api {
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
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
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
    this.apisauce.axiosInstance.interceptors.response.use(
      async (response) => {
        hideLoading();
        return response;
      },
      async (error) => {
        hideLoading();
        console.log(
          "this.config.url==--------------------------",
          this.config.url
        );
        if (error.toJSON().message === "Network Error") {
          showDialog("Error", "danger", "Network Error!", "", "OK", () =>
            hideDialog()
          );
        }
        if (error.response.status === 401) {
          showDialog(
            "Error",
            "danger",
            "Your session was expired",
            "",
            "OK",
            () => {
              resetRoot({
                index: 1,
                routes: [{ name: "authStack" } as never],
              });
              hideDialog();
            }
          );
        }
        if (error.response.status === 500 || error.response.status === 404) {
          showDialog("Error", "danger", "System Busy!", "", "OK", () =>
            hideDialog()
          );
        }
      }
    );
    this.apisauce.addAsyncRequestTransform((request) => async () => {
      try {
        if (request.data instanceof FormData) {
          request.headers = {
            imei: DeviceInfo.getUniqueIdSync() + 2,
            "Accept-Language": "en",
            "Content-Type": "multipart/form-data",
          };
        } else {
          request.headers = {
            imei: DeviceInfo.getUniqueIdSync() + 2,
            "Accept-Language": "en",
            "X-TenantId": 79,
          };
        }

        const token = await getAccessToken();
        if (token) {
          request.headers!.Authorization = "Bearer " + token;
        }
        console.log("REQUEST---111: ", request);
      } catch (err) {
        console.log("Catch err", err);
        hideLoading();
      }
    });
    this.apisauce.addResponseTransform(async (response) => {
      try {
        if (response) {
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
          console.log("firstzz", response);
        }
      } catch (error) {
        console.log("ERROR", error);
      }
    });
  }
}
