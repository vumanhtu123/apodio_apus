import { ApiResponse } from "apisauce";
import { hideLoading, showLoading } from "../../utils/toast";
import { Api } from "../base-api/api";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { Loading } from "../../../app-purchase/components/dialog-notification";

export class AddClientAPI {
    private api : Api;

    constructor(api: Api){
        this.api = api;
    }

    async createClient(client : any) : Promise<any>{
        console.log('--------data---', JSON.stringify(client))
        Loading.show({
            text: 'Loading...'
        })
        try {
            const response: ApiResponse<any> = await this.api.apisauce.post(
                ApiEndpoint.CREATE_CLIENT,
                client
            );
            Loading.hide();
            console.log("doan", response);
            
            const result = response.data;
            if (response.data.data) {
                
              return { kind: "ok", result };

            } else {
              return { kind: "bad-data", result };
            }
        } catch (error) {
            Loading.hide();
            return { kind: "bad-data", result: error };
        }
    }
}