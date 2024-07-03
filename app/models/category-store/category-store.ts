import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  flow,
  types,
} from "mobx-state-tree";
import { ProductApi } from "../../services/api/api-product";
import { CategoryApi } from "../../services/api/api_category";
import { withEnvironment } from "../extensions/with-environment";
import { Content } from "./category-store-model";
export const CategoryStoreModel = types
  .model("CategoryStore")
  .props({
    categories: types.optional(types.array(types.frozen<Content>()), []),
    page: types.optional(types.number, 0),
    size: types.optional(types.number, 20),
    totalElements: types.optional(types.number, 0),
    totalPages: types.optional(types.number, 0),
  })
  .extend(withEnvironment)
  .views((self) => ({}))
  .actions((self) => ({
    setPage(page: number) {
      self.page = page;
    },
    setSize(size: number) {
      self.size = size;
    },
    setTotalElements(totalElements: number) {
      self.totalElements = totalElements;
    },
    setTotalPages(totalPages: number) {
      self.totalPages = totalPages;
    },
  }))
  .actions((self) => ({
    getListCategories: flow(function* (
      page: number,
      size: number,
      search?: any,
      sort?: any
    ) {
      const categoryApi = new CategoryApi(self.environment.api);
      const result: any = yield categoryApi.getListCategories(
        page,
        size,
        search,
        sort
      );
      if (result.kind === "ok") {
        // console.log("category", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getListCategoriesFilter: flow(function* (
      page: number,
      size: number,
      search: any
    ) {
      const categoryApi = new CategoryApi(self.environment.api);
      const result: any = yield categoryApi.getListCategoriesFilter(
        page,
        size,
        search
      );
      if (result.kind === "ok") {
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getListCategoriesModal: flow(function* (
      page: number,
      size: number,
      search?: any,
    ) {
      const categoryApi = new CategoryApi(self.environment.api);
      const result: any = yield categoryApi.getListCategoriesModal(
        page,
        size,
        search,
      );
      if (result.kind === "ok") {
        // console.log("category", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getDeleteCategories: flow(function* (productCategoryId: number) {
      const categoryApi = new CategoryApi(self.environment.api);
      const result: any = yield categoryApi.getDeleteCategories(
        productCategoryId
      );
      if (result.kind === "ok") {
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getCreateCategories: flow(function* (name: string, imageUrl: string) {
      const categoryApi = new CategoryApi(self.environment.api);
      const result: any = yield categoryApi.getCreateCategories(name, imageUrl);
      if (result.kind === "ok") {
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getUpdateCategories: flow(function* (
      name: string,
      imageUrl: string,
      productCategoryId: number
    ) {
      const categoryApi = new CategoryApi(self.environment.api);
      const result: any = yield categoryApi.getUpdateCategories(
        name,
        imageUrl,
        productCategoryId
      );
      if (result.kind === "ok") {
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    putMoveCategory: flow(function* (fromId: string, toId: string) {
      const productApi = new ProductApi(self.environment.api);
      const result: any = yield productApi.putMoveCategory(fromId, toId);
      if (result.kind === "ok") {
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
  }));

export interface CategoriesStore extends Instance<typeof CategoryStoreModel> { }
export interface CategoriesStoreSnapshotOut
  extends SnapshotOut<typeof CategoryStoreModel> { }
export interface CategoriesStoreSnapshotIn
  extends SnapshotIn<typeof CategoryStoreModel> { }
export const createCategoriesStoreDefaultModel = () =>
  types.optional(CategoryStoreModel, {});
