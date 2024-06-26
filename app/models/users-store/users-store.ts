import { flow, types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { InforAccountAPI } from "../../services/api/api-infor-account";
import { InforAccount } from "./infor-account/infor-account-model";

export const UserStoreModal = types
.model("UserStore")
.props({

})
.extend(withEnvironment)
.views((self) =>({}))
.actions((self)=> ({

}))
.actions((self) =>({
    getInforAccount: flow(function* (
        id : number
    ){
        try {
            const inforAccountAPI = new InforAccountAPI(self.environment.apiErp)
            const result : BaseResponse<InforAccount,ErrorCode> = yield inforAccountAPI.getInforAccount(id)
            console.log("InforAccount------------", JSON.stringify(result.data))
            return result.data
        } catch (error) {
             console.log("Error get data inforAccount" ,error);
                
        }
    }),

}))