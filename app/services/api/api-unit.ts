import { Api } from "./api";
import { ApiResponse } from "apisauce";
import { ApiEndpoint } from "./api_endpoint";
import { hideLoading, showLoading } from "../../utils/toast";
import { UnitResult } from "../../models/unit/unit-model";
import { CreateUnitResult } from "../../models/unit/create-unit-model";
import { UnitGroupLine, CreateUnitGroupLineResult } from "../../models/unit/create_unit-group-line"
import { UnitGroupResult } from "../../models/unit/unit-group-model"
import { DetailUnitGroupResult } from "../../models/unit/deatl-unit-group-model";

export class UnitApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getDetailUnitGroup(id: number): Promise<DetailUnitGroupResult> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(ApiEndpoint.DETAIL_UNIT_GROUP,{
        uomGroupId: id
      });
      hideLoading();
      const result = response.data;
      if (response.data.data) {
        return { kind: "ok", result };
      } else {
        return { kind: "bad-data", result };
      }
    } catch (error) {
      return { kind: "bad-data", result: error };
    }
  }

  async getListUnit(): Promise<UnitResult> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.LIST_UNIT,
        {
          page: 0,
          size: 200,
        }
      );
      hideLoading();
      const result = response.data;
      if (response.data.data) {
        return { kind: "ok", result };
      } else {
        return { kind: "bad-data", result };
      }
    } catch (error) {
      return { kind: "bad-data", result: error };
    }
  }

  async getListUnitGroup(): Promise<UnitGroupResult> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.LIST_UNIT_GROUP,
        {
          page: 0,
          size: 200,
        }
      );
      hideLoading();
      const result = response.data;
      if (response.data.data) {
        return { kind: "ok", result };
      } else {
        return { kind: "bad-data", result };
      }
    } catch (error) {
      return { kind: "bad-data", result: error };
    }
  }


  async createUnitName(name: string): Promise<CreateUnitResult> {
    showLoading();
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        ApiEndpoint.CREATE_UNIT,
        {
          name: name,
        }
      );
      hideLoading();
      const result = response.data;
      if (response.data.data) {
        return { kind: "ok", result };
      } else {
        return { kind: "bad-data", result };
      }
    } catch (error) {
      return { kind: "bad-data", result: error };
    }
  }
  async createUnitGroupLine(params: any): Promise<CreateUnitGroupLineResult> {
    showLoading()
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(ApiEndpoint.CREATE_UNIT_GROUP,params)
      hideLoading()
      const result = response.data
      if (response.data.data){
        return { kind: "ok", result }
      }else{
        return { kind: "bad-data", result }
      }
    } catch (error) {
      return { kind: "bad-data", result: error }
    }
  }
}


