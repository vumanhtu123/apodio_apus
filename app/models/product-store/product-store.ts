import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  flow,
  types,
} from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { Content, ProductResult } from "./product-store-model";
import { ProductApi } from "../../services/api/api-product";
import { productData } from "../add-product-props";
import { UploadApi } from "../../services/api/api_upload_image";

export const ProductStoreModel = types
  .model("ProductStore")
  .props({
    product: types.optional(types.array(types.frozen<Content>()), []),
    page: types.optional(types.number, 0),
    size: types.optional(types.number, 20),
    totalElements: types.optional(types.number, 0),
    totalPages: types.optional(types.number, 0),
    productId: types.optional(types.number, 0),
    sort: types.optional(types.array(types.string), []),
    tagId: types.optional(types.number, 0),
    imageUrl: types.optional(types.string, ""),
    viewGrid: types.optional(types.boolean, true),
    imageModalIndex: types.optional(types.number, 0),
    sortCategory: types.optional(types.array(types.string), []),
    statusTab: types.optional(types.string, "product"),
    isEditing: types.optional(types.boolean, false),
    imagesLimit: types.optional(types.number, 0),
    reloadProductScreen: types.optional(types.boolean, false),
    viewProductType : types.optional(types.string , "VIEW_PRODUCT"),
    isLoadMore : types.optional(types.boolean, false),
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
    setSelectedProductId(productId: number) {
      self.productId = productId;
    },
    setSort(sort: any) {
      self.sort = sort;
    },
    setTagId(tagId: number) {
      self.tagId = tagId;
    },
    setImageUrl(value: string) {
      self.imageUrl = value;
    },
    setViewGrid(viewGird: boolean) {
      self.viewGrid = viewGird;
    },
    setReloadProductScreen(reload: boolean) {
      self.reloadProductScreen = reload
    }, 
    setImagesLimit(imagesLength: number) {
      self.imagesLimit = imagesLength
    },
    setImageModalIndex(index: number) {
      self.imageModalIndex = index;
    },
    setSortCategory(sortCategory: any) {
      self.sortCategory = sortCategory;
    },
    setStatusTab(statusTab: any) {
      self.statusTab = statusTab;
    },
    setIsEditing(isEditing: boolean) {
      self.isEditing = isEditing;
    },
    setViewProductType (viewProductType : string) {
      self.viewProductType = viewProductType
    },
    setIsLoadMore (isLoadMore : boolean) {
      self.isLoadMore = isLoadMore
    }
  }))
  .actions((self) => ({
    getListProduct: flow(function* (
      page: number,
      size: number,
      viewProduct: any,
      productCategoryId: number,
      search: string,
      tagId: number,
      sortId: string,
      isLoadMore : boolean
    ) {
      const productApi = new ProductApi(self.environment.api);
      const result: ProductResult = yield productApi.getListProduct(
        page,
        size,
        viewProduct,
        productCategoryId,
        search,
        tagId,
        sortId,
        isLoadMore
      );
      if (result.kind === "ok") {
        console.log("product", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getListTagProduct: flow(function* () {
      const product = new ProductApi(self.environment.api);
      const result = yield product.getListTagProduct();
      if (result.kind === "ok") {
        return result;
      } else {
        return result;
      }
    }),
    getListBrand: flow(function* () {
      const product = new ProductApi(self.environment.api);
      const result = yield product.getListBrandProduct();
      if (result.kind === "ok") {
        return result;
      } else {
        return result;
      }
    }),
    postProduct: flow(function* (productAdd: typeof productData) {
      console.log(
        "post-create-product-data------- : ",
        JSON.stringify(productAdd)
      );
      const product = new ProductApi(self.environment.api);
      const result = yield product.createProduct(productAdd);
      // console.log("tuvm product" + productAdd);
      if (result.kind === "ok") {
        console.log("post-product-Success : ", result);
        return result;
      } else {
        console.log("post-product-Failed : ", result.result.errorCodes);
        return result;
      }
    }),
    putProduct: flow(function* (id: number, productAdd: typeof productData) {
      console.log(
        "tuvm product--------------------------",
        JSON.stringify(productAdd)
      );
      const product = new ProductApi(self.environment.api);
      const result = yield product.editProduct(id, productAdd);
      if (result.kind === "ok") {
        console.log("post-product-Success : ", result);
        return result;
      } else {
        console.log("post-product-Failed : ", result.result.errorCodes);
        return result;
      }
    }),
    deleteProduct: flow(function* (id: Number) {
      const product = new ProductApi(self.environment.api);
      const result = yield product.deleteProduct(id);

      console.log("tuvm product----------------", result);
      if (result.kind === "ok") {
        console.log("post-product-Success : ", result);
        return result;
      } else {
        console.log("post-product-Failed : ", result.message);
        return result;
      }
    }),
    deleteCheck: flow(function* (id: Number) {
      const product = new ProductApi(self.environment.api);
      const result = yield product.deleteCheck(id);

      console.log("tuvm product");
      if (result.kind === "ok") {
        console.log("post-product-Success : ", result);
        return result;
      } else {
        console.log("post-product-Failed : ", result.message);
        return result;
      }
    }),
    usingProductCheck: flow(function* (id: Number) {
      const product = new ProductApi(self.environment.api);
      const result = yield product.usingProductCheck(id);

      console.log("tuvm product");
      if (result.kind === "ok") {
        console.log("post-product-Success : ", result);
        return result;
      } else {
        console.log("post-product-Failed : ", result.message);
        return result;
      }
    }),
    getDetailProduct: flow(function* (id: number) {
      const productApi = new ProductApi(self.environment.api);
      const result: ProductResult = yield productApi.getDetailProduct(id);
      if (result.kind === "ok") {
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
    getDetailClassify: flow(function* (id: number) {
      const productApi = new ProductApi(self.environment.api);
      const result: ProductResult = yield productApi.getDetailClassify(id);
      if (result.kind === "ok") {
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),

    uploadImages: flow(function* (formData) {
      try {
        const productApi = new UploadApi(self.environment.apiUpload);
        const result: any = yield productApi.uploadImages(
          formData,
          (results) => {
            console.log("results-------------------------", results);
          }
        );
        if (result && result.result && result.result.data) {
          const { data, traceId, errorCodes } = result.result.data;
          if (traceId) {
            console.log("errorCodes", errorCodes);
            if (errorCodes !== undefined && errorCodes[0].code) {
              return null;
            } else {
              self.setImageUrl(data.url);
              return data.url;
            }
          }
        } else {
          console.log("Lỗi khi tải lên ảnh:", result);
        }
      } catch (error) {
        console.log("ERROR UPLOAD AVATAR", error);
        return error;
      }
    }),
  }));

export interface ProductStore extends Instance<typeof ProductStoreModel> { }
export interface ProductStoreSnapshotOut
  extends SnapshotOut<typeof ProductStoreModel> { }
export interface ProductStoreSnapshotIn
  extends SnapshotIn<typeof ProductStoreModel> { }
export const createProductStoreDefaultModel = () =>
  types.optional(ProductStoreModel, {});
