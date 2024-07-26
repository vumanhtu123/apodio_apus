import { size } from 'lodash';
import { flow, types } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";

export const SupplierStore = types
    .model("SupplierStore")
    .props({

    })
    .extend(withEnvironment)
    .views((self)=>({}))
    .actions((self) => ({

    }))
    .actions((self) => ({
        getListSupplier :  flow(function* (
            size: number,
            page: number,
            search: string,  
        ) {

        })
    }))
