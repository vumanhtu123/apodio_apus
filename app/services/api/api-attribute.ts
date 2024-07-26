import { Api } from "../base-api/api"
import { ApiResponse } from "apisauce"
import { ApiEndpoint } from "../base-api/api_endpoint"
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../components/dialog-notification";




export class AttributeApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getListAttribute(page: number, size: number, activated: boolean): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(ApiEndpoint.LIST_ATTRIBUTE, {
        page,
        size,
        activated
      }
      )
      Loading.hide();
      const data = response.data
      if (response.data.data) {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" }
    }
  }  
  async getListDataAttribute(categoryIds: any): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
        const queryStringParts = categoryIds.map((id: any) => `categoryIds=${id}`);
        const queryString = categoryIds.length !== 0 ? '?' + queryStringParts.join('&'): ''
      const response: ApiResponse<any> = await this.api.apisauce.get(ApiEndpoint.LIST_DATA_ATTRIBUTE+ queryString, 
      )
      Loading.hide();
      const data = response.data
      console.log('-----getListDataAttribute-------', response)
      if (response.data.data) {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" }
    }
  }  

  async createAttributeGroup(name: any): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(ApiEndpoint.CREATE_ATTRIBUTE_GROUP, {
        name,
        activated: true
      }
      )
      Loading.hide();
      const data = response.data
      if (response.data.data) {
        return { kind: "ok", response: data }
      }
      return { kind: "bad-data", response: data }
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" }
    }
  }  

  async createAttributeDataGroup(DataAttribute: any,attributeCategoryId: number): Promise<any> {
    Loading.show({
      text: 'Loading...',
    });
    try {
      console.log('----arr----', JSON.stringify(DataAttribute))
      const response: ApiResponse<any> = await this.api.apisauce.post(ApiEndpoint.CREATE_DATA_ATTRIBUTE_GROUP+ "?attributeCategoryId=" + attributeCategoryId,
        DataAttribute,
      )
      Loading.hide();
      const data = response.data
      console.log('--------------------cxz', response.data)
      if (response.data.errorCodes) {
        return { kind: "bad-data", response: data }
      }
      return { kind: "ok", response: data }
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" }
    }
  }  
}
