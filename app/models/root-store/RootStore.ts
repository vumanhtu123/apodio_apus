import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { AuthenticationStoreModel } from "../AuthenticationStore";
import { CategoryStoreModel } from "../category-store/category-store";
import { UnitStoreModel } from "../unit/unit-store";
import { VendorStoreModel } from "../vendor/vendor-store";
import { ProductStoreModel } from "../product-store/product-store";
import { AttributeStoreModel } from "../attribute-store/attribute-store";
import { HomeStoreModel } from "../home-store/home-store";

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  unitStore: types.optional(UnitStoreModel, {}),
  vendorStore: types.optional(VendorStoreModel, {}),
  categoryStore: types.optional(CategoryStoreModel, {}),
  productStore: types.optional(ProductStoreModel, {}),
  attributeStore: types.optional(AttributeStoreModel, {}),
  HomeStore: types.optional(HomeStoreModel, {}),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {
  loginStore: any;
}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
