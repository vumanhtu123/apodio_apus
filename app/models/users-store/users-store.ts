import { flow, types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { InfoAccountAPI } from "../../services/api/api-infor-account";
import { InfoAccount } from "./infor-account/infor-account-model";

export const UserStoreModal = types
.model("UserStore")
.props({

})
.extend(withEnvironment)
.views((self) =>({}))
.actions((self)=> ({

}))
.actions((self) =>({
    getInfoAccount: flow(function* (
        id : number
    ){
        console.log('====================================');
        console.log("id user", id);
        console.log('====================================');
        try {
            const infoAccountAPI = new InfoAccountAPI(self.environment.apiErp)
            const result : BaseResponse<InfoAccount,ErrorCode> = yield infoAccountAPI.getInfoAccount(id)
            console.log("InforAccount------------", JSON.stringify(result))
            return result
        } catch (error) {
             console.log("Error get data inforAccount" ,error);
                
        }
    }),

}))