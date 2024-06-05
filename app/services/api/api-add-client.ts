import { ApiResponse } from "apisauce";
import { hideLoading, showLoading } from "../../utils/toast";
import { Api } from "../base-api/api";
import { ApiEndpoint } from "../base-api/api_endpoint";

export class AddClientAPI {
    private api : Api;

    constructor(api: Api){
        this.api = api;
    }

    async createClient(client : any) : Promise<any>{
        console.log('--------data---', JSON.stringify(client))
        showLoading();
        try {
            const response: ApiResponse<any> = await this.api.apisauce.post(
                ApiEndpoint.CREATE_CLIENT,
                client
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
}