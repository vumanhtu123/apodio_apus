import { ApiUpload } from "./api_upload";
import { ApiResponse } from "apisauce";
import { ApiEndpoint } from "./api_endpoint";
import { hideLoading, showLoading } from "../../utils/toast";

export class UploadApi {
  private api: ApiUpload;

  constructor(api: ApiUpload) {
    this.api = api;
  }

  async uploadImages(
    formData: any,
    callBack: (arg0: number) => void
  ): Promise<any> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        `${ApiEndpoint.UPLOAD_IMAGES}?feature_alias=upload-product`,
        formData,
        {
          onUploadProgress(progressEvent) {
            //if (progressEvent && progressEvent.total && progressEvent.loaded) {
            const percent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            console.log("Upload progress:", percent, "%");
            callBack(percent);
            // } else {
            //   console.error('Progress event does not contain necessary properties');
            // }
          },
        }
      );
      const result = response;
      console.log("respone", response);
      hideLoading();
      return { kind: "ok", result };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: "bad-data" };
    }
  }
  
}
