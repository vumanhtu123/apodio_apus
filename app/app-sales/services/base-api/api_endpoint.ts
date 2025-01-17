export const ApiEndpoint = {
  SIGN_UP: "/auth/register",
  SIGN_IN: "/oauth/login",
  LOG_OUT: "/oauth/logout",
  REFRESH_TOKEN: "/oauth/refresh-token",
  FORGOT_PASSWORD: "/public-api/v1/user/forgot-password",
  GENERATE_OTP: "/public-api/v1/user/generate-otp",
  RESET_PASSWORD: "/users/",
  CHANGE_PASSWORD: "/users/",
  LIST_PRODUCT: "/product/list",
  USER_INFO: "/users/",
  EDIT_PROFILE: "/users-update",
  NOTIFY: "/getlist/",
  CREATE_HISTORY: "/history",
  HISTORY: "/history",
  LIST_CATEGORY: "/api/v1/goods/mobile-product-category/list",
  DETAIL_UNIT_GROUP: "/api/v1/mobile-unit-group",
  LIST_UNIT: "/api/v1/unit/list",
  LIST_UNIT_GROUP: "/api/v1/mobile-unit-group/list",
  DELETE_CATEGORY: "/api/v1/goods/mobile-product-category",
  CREATE_CATEGORY: "/api/v1/goods/product-category",
  UPDATE_CATEGORY: "/api/v1/goods/product-category",
  CREATE_UNIT: "/api/v1/unit",
  CREATE_UNIT_GROUP: "/api/v1/mobile-unit-group",
  LIST_TAG_PRODUCT: "/api/v1/goods/tag/list",
  LIST_BRAND_PRODUCT: "/api/v1/product-brand/list",
  LIST_ATTRIBUTE: "/api/v1/product-attribute-category/list",
  LIST_DATA_ATTRIBUTE: "/api/v1/product-attribute-category/get-attribute",
  CREATE_ATTRIBUTE_GROUP: "/api/v2/product-attribute-category",
  CREATE_DATA_ATTRIBUTE_GROUP: "/api/v1/mobile-product-attribute",
  GET_LIST_PRODUCT: "/api/v1/goods/mobile-product-template/list",
  ADD_PRODUCT: "/api/v1/goods/mobile-product-template",
  EDIT_CLASSIFY: "/api/v1/goods/product-template/product",
  DELETE_CLASSIFY: "/api/v1/goods/mobile-product-template/variant",
  PUT_MOVE_CATEGORY: "/api/v3/goods/product-category/move-sequence",
  GET_PRODUCT_DETAIL: "/api/v1/goods/mobile-product-template",
  GET_CLASSIFY_DETAIL: "/api/v1/goods/mobile-product-template/variant",
  GET_LIST_VENDOR: "/api/v1/vendor/partners/list",
  UPLOAD_IMAGES: "/api/v1/file-upload",
  DELETE_CHECK: "/api/v1/goods/product-template/delete-check",
  USING_PRODUCT_CHECK: "/api/v1/product-template/use-in-another-service",
  COMPANY_INFO: "/api/v1/companies/info",
  GET_LIST_COMPANY: "/api/v1/tenant/list-by-user",
  GET_LIST_ORDER_PRODUCT: "/api/v1/retail/sale-order/product-templates",
  GET_LIST_ORDER_VARIANT: "/api/v1/retail/sale-order/products",
  GET_LIST_ORDER_PRODUCT_PRICE:
    "/api/v1/retail/sale-order/price-list/product-templates",
  GET_LIST_ORDER_VARIANT_PRICE: "/api/v1/retail/sale-order/price-list/products",
  GET_DETAIL_ORDER: "/api/v1/retail/sale-order",
  POST_PRICE_VARIANT: "/api/v1/b2c/request-price-list/request/price",
  GET_LIST_PRICE_LIST: "/api/v1/b2c/price-list/list",
  GET_DETAIL_INVOICE: "/api/v1/account-move/b2c",
  GET_LIST_TAX: "/api/v1/tax/list",
  GET_LIST_TAX_LINES: "/api/v1/tax/compute-tax-lines",
  GET_DEBT_LIMIT: "/api/v1/mobile/account-move/debt",
  CANCEL_ORDER: "/api/v1/retail/sale-order/cancel",
  GET_STATE_ALLOW: "/api/v1/retail/sale-order/state-allow",
  GET_LIST_PAYMENT_TERM: "/api/v1/payment-term/list",
  GET_LIST_SELECT_CLIENT: "/api/v1/b2c/partners/list",
  GET_LIST_ORDER: "/api/v1/retail/sale-order/list",
  CREATE_CLIENT: "/api/v1/b2c/partners",
  GET_LIST_CITY: "/api/v1/cities/list/city-country",
  GET_LIST_DISTRICT: "/api/v1/districts/list/district-city",
  GET_LIST_WARD: "/api/v1/ward/list/ward-district",
  CREATE_ADDRESS: "/api/v1/b2c/partners/address",
  GET_LIST_ADDRESS: "/api/v1/b2c/partners/address/list",
  // GET_LIST_PRICE_LIST:
  //   "/api/v1/b2c/price-list/list?trackingState=OPERATION&page=0&size=20",
  GET_LIST_SLECT_CLIENT: "/api/v1/b2c/partners/list",
  GET_DATA_REVENUE_THIS_MONTH: "/api/v1/retail/sale-order/dashboard",
  GET_INFOR_ACCOUNT: "/api/v1/merchant/partners",
  CREATE_INVOICE: "/api/v1/mobile/account-move",
  POST_LIST_TAX_LINES: "/api/v1/tax/compute-tax-lines",
  POST_ADD_SALE_ORDER: "/api/v1/retail/sale-order",
  // GET_DEBT_LIMIT: "/api/v1/mobile/account-move/debt",
  GET_LIST_ACCOUNT_LEDGER: "/api/v1/account-ledger/list",
  GET_DEBT_ACCOUNT_LEDGER: "/api/v2/debt/total",
  GET_LIST_TAG_CLIENT: "/api/v1/b2c/partner-tag/list",
  GET_BALANCE_LIMIT: "/api/v1/mobile/account-move/balance",
  POST_SUBMIT_PASSWORD: "/public-api/v1/user/submit-password",
  PRINT_INVOICE: "/api/v1/print/invoice-sale",
  GET_LIST_WAREHOUSE: "/api/v1/sale/stock-warehouse/list",
  GET_DETAIL_WAREHOUSE: "/api/v1/sale/stock-warehouse",
  POST_STOCK_WAREHOUSE: "/api/v1/sale/stock-warehouse",
  PUT_CHANGE_PASS: "/api/v1/user/change-password",
  PUT_STOCK_WAREHOUSE: "/api/v1/sale/stock-warehouse",
  DELETE_WAREHOUSE: "/api/v1/sale/stock-warehouse",
  NUMBER_STATE: "/api/v1/sale/stock-warehouse/warehouse-number",
  GET_LIST_SUPPLIER: "/api/v1/vendor/partner-tag/list",
  GET_LIST_SUPPLIER_GROUP: "/api/v1/vendor/partners/list",
  GET_LIST_DEBT_SALE: "/v3/ad562313-93ab-4315-8e9e-690f2fed7666",
};
