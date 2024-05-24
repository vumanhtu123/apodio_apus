import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  flow,
  types,
} from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { OderApi } from "../../services/api/api-oder";
import { HomeApi } from "../../services/api/api-home";
import { AttributeApi } from "../../services/api/api-attribute";
import { AttributeResult } from "./list-attribute-model";
import { AttributeDataResult } from "./data-attribute-model";
import { AttributeNameResult } from "./name-attribute-model";
import { AttributeDataGroupResult } from "./data-group-attribute";

/**
 * Model description here for TypeScript hints.
 */

export interface NewAttribute {
  text: Text;
  value: Number;
}

export const AttributeStoreModel = types
  .model("AttributeStore")
  .props({
    // attribute: types.optional(types.array(types.frozen<Attribute>()), []),
    // page: types.optional(types.number, 0),
    // size: types.optional(types.number, 50),
    // activated: types.optional(types.boolean, true),
    idNewAttribute: types.optional(types.array(types.frozen<NewAttribute>()), []),
  })
  .extend(withEnvironment)
  .views((self) => ({}))
  .actions((self) => ({
    // setAttribute(attribute: Attribute[]) {
    //     self.attribute = attribute
    // },
    // setPage(page: number) {
    //     self.page = page
    // },
    // setSize(size: number) {
    //     self.size = size
    // },
    setIdNewAttribute(idNewAttribute: any) {
      self.idNewAttribute = idNewAttribute;
    },
  }))
  .actions((self) => ({
    getListAttribute: flow(function* (
      page: number,
      size: number,
      activated: boolean
    ) {
      const attributeApi = new AttributeApi(self.environment.api);
      const result: AttributeResult = yield attributeApi.getListAttribute(page, size, activated);
      // console.log('resulttt' , result)
      if (result.kind === "ok") {
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getListDataAttribute: flow(function* (categoryIds: any) {
      const attributeApi = new AttributeApi(self.environment.api);
      const result: AttributeDataResult =
        yield attributeApi.getListDataAttribute(categoryIds);
      console.log("resulttt", result);
      if (result.kind === "ok") {
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),

    createAttributeGroup: flow(function* (name: any) {
      const attributeApi = new AttributeApi(self.environment.api);
      const result: AttributeNameResult = yield attributeApi.createAttributeGroup(
        name
      );
      // console.log('resulttt' , result)
      if (result.kind === "ok") {
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),

    createAttributeDataGroup: flow(function* (dataAttribute: any, id: number) {
      const attributeApi = new AttributeApi(self.environment.api);
      const result: AttributeDataGroupResult =
        yield attributeApi.createAttributeDataGroup(dataAttribute, id);
      // console.log('resulttt' , result)
      if (result.kind === "ok") {
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
  }));

export interface attributeStore extends Instance<typeof AttributeStoreModel> {}
export interface attributeStoreSnapshotOut
  extends SnapshotOut<typeof AttributeStoreModel> {}
export interface attributeStoreSnapshotIn
  extends SnapshotIn<typeof AttributeStoreModel> {}
export const createAttributeStoreDefaultModel = () =>
  types.optional(AttributeStoreModel, {});
