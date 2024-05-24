import { ApiResponse, ApisauceInstance, create } from "apisauce";
import {
  hideDialog,
  hideLoading,
  showDialog,
  showLoading,
} from "../../utils/toast";
import DeviceInfo from "react-native-device-info";
import {
  ApiConfig,
  DEFAULT_API_CONFIG_GET_WAY,
  DEFAULT_API_CONFIG_UAA,
} from "./api-config";
import { resetRoot } from "../../navigators";
import { getAccessToken, getTenantId } from "../../utils/storage";

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
        hideLoading();
        console.log("RESPONSE UAA :", response);
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
        hideLoading();
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
