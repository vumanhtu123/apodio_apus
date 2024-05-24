import { Api } from "./api"
import { ApiResponse } from "apisauce"
import { ApiEndpoint } from "./api_endpoint"
import { hideLoading, showLoading } from "../../utils/toast"
import { BalanceResult } from "./api.types.home"



export class AttributeApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getListAttribute(page: number, size: number, activated: boolean): Promise<any> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(ApiEndpoint.LIST_ATTRIBUTE, {
        page,
        size,
        activated
      }
      )
      hideLoading()
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }  
  async getListDataAttribute(categoryIds: any): Promise<any> {
    showLoading()
    try {
        const queryStringParts = categoryIds.map(id => `categoryIds=${id}`);
        const queryString = categoryIds.length !== 0 ? '?' + queryStringParts.join('&'): ''
      const response: ApiResponse<any> = await this.api.apisauce.get(ApiEndpoint.LIST_DATA_ATTRIBUTE+ queryString, 
      )
      hideLoading()
      const data = response.data
      console.log('-----getListDataAttribute-------', response)
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }  

  async createAttributeGroup(name: any): Promise<any> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(ApiEndpoint.CREATE_ATTRIBUTE_GROUP, {
        name
      }
      )
      hideLoading()
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }  

  async createAttributeDataGroup(DataAttribute: any,attributeCategoryId: number): Promise<any> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(ApiEndpoint.CREATE_DATA_ATTRIBUTE_GROUP+ "?attributeCategoryId=" + attributeCategoryId,
        DataAttribute,
      )
      hideLoading()
      const data = response.data
      if (response.data.message === 'Success') {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }  
}
