export const ApiEndpoint = {
  SIGN_UP: "/auth/register",
  SIGN_IN: "/oauth/login",
  LOG_OUT: "/oauth/logout",
  REFRESH_TOKEN: "/oauth/refresh-token",
  FORGOT_PASSWORD: "/public-api/v1/user/forgot-password",
  RESET_PASSWORD: "/users/",
  CHANGE_PASSWORD: "/users/",
  LIST_PRODUCT: "/product/list",
  USER_INFO: "/users/",
  EDIT_PROFILE: "/users-update",
  NOTIFY: "/getlist/",
  CREATE_HISTORY: "/history",
  HISTORY: "/history",
  LIST_CATEGORY: "/api/v3/goods/product-category/list",
  DETAIL_UNIT_GROUP: "/api/v2/unit-group",
  LIST_UNIT: "/api/v2/unit/list",
  LIST_UNIT_GROUP: "/api/v2/unit-group/list",
  DELETE_CATEGORY: "/api/v3/goods/product-category",
  CREATE_CATEGORY: "/api/v3/goods/product-category",
  UPDATE_CATEGORY: "/api/v3/goods/product-category",
  CREATE_UNIT: "/api/v2/unit",
  CREATE_UNIT_GROUP: "/api/v2/unit-group",
  LIST_TAG_PRODUCT: "/api/v1/goods/tag/list",
  LIST_BRAND_PRODUCT: "/api/v1/product-brand/list",
  LIST_ATTRIBUTE: "/api/v1/product-attribute-category/list",
  LIST_DATA_ATTRIBUTE: "/api/v1/product-attribute-category/get-attribute",
  CREATE_ATTRIBUTE_GROUP: "/api/v2/product-attribute-category",
  CREATE_DATA_ATTRIBUTE_GROUP: "/api/v2/product-attribute",
  GET_LIST_PRODUCT: "/api/v2/goods/product-template/list",
  ADD_PRODUCT: "/api/v2/goods/product-template",
  PUT_MOVE_CATEGORY: "/api/v3/goods/product-category/move-sequence",
  GET_PRODUCT_DETAIL: "/api/v2/goods/product-template",
  GET_CLASSIFY_DETAIL: "/api/v2/goods/product-template/variant",
  GET_LIST_VENDOR: "/api/v1/vendor/partners/list",
  UPLOAD_IMAGES: "/api/v1/file-upload",
  DELETE_CHECK: "/api/v1/goods/product-template/delete-check",
  USING_PRODUCT_CHECK: "/api/v1/product-template/use-in-another-service",
  COMPANY_INFO: "/api/v1/companies/info1",
  GET_LIST_COMPANY: "/api/v1/tenant/list-by-user",
  GET_LIST_ORDER: "/api/v1/retail/sale-order/list",
  GET_LIST_SLECT_CLIENT: "/api/v1/b2c/partners/list",
  CREATE_CLIENT: "/api/v1/b2c/partners",
  GET_LIST_ORDER_PRODUCT: "/api/v1/retail/sale-order/product-templates",
  GET_LIST_ORDER_VARIANT: "/api/v1/retail/sale-order/products",
  GET_LIST_ORDER_PRODUCT_PRICE:
    "/api/v1/retail/sale-order/price-list/product-templates",
  GET_LIST_ORDER_VARIANT_PRICE: "/api/v1/retail/sale-order/price-list/products",
  GET_LIST_CITY: "/api/v1/cities/list/city-country",
  GET_LIST_DISTRICT: "/api/v1/districts/list/district-city",
  GET_LIST_WARD: "/api/v1/ward/list/ward-district",
  GET_DETAIL_ORDER: "/api/v1/retail/sale-order",
  CREATE_ADDRESS: "/api/v1/b2c/partners/address",
  GET_LIST_ADDRESS: "/api/v1/b2c/partners/address/list",
  GET_LIST_TAX: "/api/v1/tax/list",
};
