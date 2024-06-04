import { ApiResponse } from "apisauce"
import { hideLoading, showLoading } from "../../utils/toast"
import { ApiOrder } from "../base-api/api-config-order"
import { ApiEndpoint } from "../base-api/api_endpoint"



export class OrderApi {
  private api: ApiOrder

  constructor(api: ApiOrder) {
    this.api = api
  }

  async getListOrder(page: number, size: number): Promise<any> {
    showLoading()
    try {
      // console.log('first0--' ,ApiEndpoint.GET_LIST_ORDER )
      const response: ApiResponse<any> = await this.api.apisauce.get(ApiEndpoint.GET_LIST_ORDER, {
        page,
        size,
        // activated
      }
      )
      hideLoading()
      console.log('-----------------respone' , response)
      const data = response.data
      console.log('-----------------data' , data)
      if (response.data.data) {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }  

}
