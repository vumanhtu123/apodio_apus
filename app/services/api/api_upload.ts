import { ApisauceInstance, create } from "apisauce"
import { ApiConfig, DEFAULT_API_CONFIG_UPLOAD } from "./api-config"
import { getAccessToken } from "../../utils/storage"
import { hideDialog, hideLoading, showDialog, showLoading, showLoadingT } from "../../utils/toast"
import { navigate, resetRoot } from "../../navigators"
import DeviceInfo from "react-native-device-info"
/**
 * Manages all requests to the API.
 */
export class ApiUpload {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce!: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG_UPLOAD) {
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
    })
    this.apisauce.axiosInstance.interceptors.response.use(
      async response => {
        hideLoading()
        return response
      },
      async error => {
        hideLoading()
        console.log('error==', error)
        if (error.toJSON().message === 'Network Error') {
          showDialog('Error', 'danger', 'Network Error!', '', 'OK', () => hideDialog())
        }
        if (error.response.status === 401) {
          showDialog('Error', 'danger', 'Your session was expired', '', 'OK', () => {
            resetRoot({
              index: 1,
              routes: [{ name: 'authStack' }],
            })
            hideDialog()
          })
        }
        if (error.response.status === 500 || error.response.status === 404) {
          showDialog('Error', 'danger', 'System Busy!', '', 'OK', () => hideDialog())
        }
      }
    )
    this.apisauce.addAsyncRequestTransform(request => async () => {
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
          };
        }

        
        const token = await getAccessToken()
        const token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiI3OSIsInVzZXJfaWQiOjEsImJyYW5jaF9pZCI6NjAxLCJ1c2VyX25hbWUiOiJzeXN0ZW1fYWRtaW4iLCJpc19vd25lciI6ZmFsc2UsInNjb3BlIjpbImdhdGV3YXkiXSwiZXhwIjoxNzE1MzEwMjQwLCJhdXRob3JpdGllcyI6WyJTWVNURU1fVVNFUiIsIlNZU1RFTV9BRE1JTiJdLCJqdGkiOiJLLU1TMGFJbDFnMk1qeENHWU14aGJ2cllWcWMiLCJjbGllbnRfaWQiOiJ0ZXN0In0.BwxrEfJaFcf5WzOIpFRhrYJ90D8soqkvRodCbWUNXST9HQD-5mFMT8dG6RdgidENebcFh9u4FUgom-2PnbtmNQ-cgWxU2sIYKD8BXR_zLRsWWopDxAFEKDHS9L6J_dj-gvm_xhV6Ieks2ciGQA1n61VMKQ51TpPfOZriy7gMbLaZWRsEh0QLRMXBB5kNFBfyzfEaPtNONxurUGIoa2EBJTkT-Ff3fDqoOSn7oJZ6eIbTOdX4ewu5WcLmyXlAoKc46-P_nRk5O5K7nLwEUJBbtqQnKlp1XoF5rrw4HlR5b8XdTmjIcsYOepbyhEMcl0DCffb4Jz8aIpQvUdv7jP_Z4g'
        if (token) {
          (request.headers!).Authorization = 'Bearer ' + token
        }
        console.log('REQUEST---111: ', request)
      } catch (err) {
        console.log('Catch err', err)
        hideLoading()
      }
    })
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
          console.log('firstzz' , response)
        }
      } catch (error) {
        console.log("ERROR", error)
      }
    })
  }
}
