import { ApiResponse } from "apisauce"
import { hideLoading, showLoading } from "../../utils/toast"
import { ApiOrder } from "../base-api/api-config-order"
import { ApiEndpoint } from "../base-api/api_endpoint"
import { Loading } from "../../components/dialog-notification"



export class OrderApi {
  private api: ApiOrder

  constructor(api: ApiOrder) {
    this.api = api
  }

  async getListOrder(page: number, size: number): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      // console.log('first0--' ,ApiEndpoint.GET_LIST_ORDER )
      const response: ApiResponse<any> = await this.api.apisauce.get(ApiEndpoint.GET_LIST_ORDER, {
        page,
        size,
        // activated
      }
      )
      Loading.hide();
      console.log('-----------------respone' , response)
      const data = response.data
      console.log('-----------------data' , data)
      if (response.data.data) {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" }
    }
  }  
  async getDetailOrder(id: number): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(ApiEndpoint.GET_DETAIL_ORDER, {
        id
      }
      )
      Loading.hide();
      console.log('-----------------respone' , response)
      const data = response.data
      console.log('-----------------data' , data.message)
      if (response.data.data) {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();

      return { kind: "bad-data" }
    }
  }  
}
