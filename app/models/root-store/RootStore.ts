import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { AuthenticationStoreModel } from "../AuthenticationStore";
import { CategoryStoreModel } from "../category-store/category-store";
import { UnitStoreModel } from "../unit/unit-store";
import { VendorStoreModel } from "../vendor/vendor-store";
import { ProductStoreModel } from "../product-store/product-store";
import { AttributeStoreModel } from "../attribute-store/attribute-store";
import { HomeStoreModel } from "../home-store/home-store";
import { OrderStoreModel } from "../order-store/order-store";
import { DashBoardStoreModel } from "../dashboard-store/dashborad-store";
import { UserStoreModal } from "../users-store/users-store";
import { CompanyStoreModel } from "../company-info-store/company-store";
import { WarehouseStoreModal } from "../warehouse-store/warehouse-store";
import { SupplierStore } from "../supplier-store/supplier-store";

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
  orderStore: types.optional(OrderStoreModel, {}),
  dashBoardStore: types.optional(DashBoardStoreModel,{}), 
  userStore : types.optional(UserStoreModal, {}),
  companyStore : types.optional(CompanyStoreModel, {}),
  warehouseStore: types.optional(WarehouseStoreModal,{}),
  supplierStore: types.optional(SupplierStore,{})
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
