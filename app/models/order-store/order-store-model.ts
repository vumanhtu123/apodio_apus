export interface InputSelectModel {
  id: string,
  label: string
}

interface Partner {
  id: number;
  code: string;
  name: string;
  avatarUrl: string;
  isCompany: boolean;
  email: string;
  phoneNumber: string;
  regionId: number;
  region: string;
  cityId: number;
  city: string;
  districtId: number;
  district: string;
  wardId: number;
  ward: string;
  address: string;
  joinDate: string;
  partnerTag: string[];
  partnerTagIds: number[];
  cardId: string;
  birth: string;
  gender: string;
  website: string;
  activated: boolean;
  addressContacts: {
    id: number;
    addressType: string;
    name: string;
    title: string;
    position: string;
    address: string;
    email: string;
    phoneNumber: string;
    note: string;
    taxCode: string;
  }[];
  bankAccounts: {
    id: number;
    bankId: number;
    bank: string;
    bankBranchId: number;
    bankBranch: string;
    accountNumber: string;
    accountHolder: string;
  }[];
  note: string;
}

interface PriceList {
  id: number;
  code: string;
  name: string;
}

interface Currency {
  id: number;
  name: string;
}

interface PaymentTerm {
  id: number;
  name: string;
}

interface Promotion {
  id: number;
  name: number;
}

interface Warehouse {
  id: number;
  name: string;
  quantity: number;
}

interface SaleUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

interface ProductTemplate {
  id: number;
  hasVariant: boolean;
  sku: string;
  upc: string;
  name: string;
  productCategoryId: number;
  productCategoryName: string;
  uomId: number;
  uomName: string;
  managementForm: string;
  isInternal: boolean;
  isMaterial: boolean;
  isGoods: boolean;
  isSemiFinished: boolean;
  isOEM: boolean;
}

interface UomGroupLineItem {
  id: number;
  uomId: number;
  uomName: string;
  conversionRate: number;
  accuracy: number;
  uomLineType: string;
}

interface UomGroup {
  id: number;
  code: string;
  name: string;
  uomOriginId: number;
  uomOriginName: string;
  uomGroupLineItems: UomGroupLineItem[];
}

interface BaseProductPackingLine {
  id: number;
  uomId: number;
  uomName: string;
  uomGroupLineId: number;
  productId: number;
  amount: number;
  uomLineType: string;
  length: number;
  high: number;
  wide: number;
  weight: number;
  volume: number;
}

interface ProductPackingLine {
  id: number;
  uomId: number;
  uomName: string;
  uomGroupLineId: number;
  productId: number;
  amount: number;
  uomLineType: string;
  length: number;
  high: number;
  wide: number;
  weight: number;
  volume: number;
}

interface SaleUom {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

interface Warehouse {
  id: number;
  name: string;
  quantity: number;
}

interface ProductInfo {
  id: number;
  name: string;
  sku: string;
  upc: string;
  uomId: number;
  uomCode: string;
  uomName: string;
  productImage: string[];
  productTemplate: ProductTemplate;
  quantityInventory: number;
  minQuantity: number;
  uomGroup: UomGroup;
  baseProductPackingLine: BaseProductPackingLine;
  productPackingLines: ProductPackingLine[];
  saleUom: SaleUom;
  brand: Brand;
  warehouses: Warehouse[];
}

interface Tax {
  id: number;
  code: string;
  name: string;
}

interface Repartition {
  id: number;
  accountId: number;
  accountTagId: number;
  amount: number;
}

interface TaxLine {
  taxId: number;
  taxName: string;
  amount: number;
  repartitions: Repartition[];
}

interface TaxLines {
  items: TaxLine[];
  amount: number;
  untaxedAmount: number;
}

interface SaleOrderLine {
  id: number;
  sequence: number;
  productId: number;
  productInfo: ProductInfo;
  quantity: number;
  quantityInventory: number;
  remainInvoiceQty: number;
  requestedQty: number;
  deliveredQty: number;
  uomId: number;
  orderQty: number;
  orderUomId: number;
  orderUomName: string;
  unitPrice: number;
  amountUntaxed: number;
  amountTotal: number;
  taxIds: number[];
  tax: Tax[];
  discount: number;
  discountComputeType: string;
  type: string;
  note: string;
  taxLines: TaxLines;
  productName: string;
  taxes: string[];
  isPriceChange: boolean;
}

interface ComputeTaxInfo {
  taxLines: TaxLines[];
  summaryItems: TaxLine[];
  cashRounding: {
    id: number;
    name: string;
    roundingPrecision: number;
    roundingStrategy: string;
    profitAccountId: number;
    lossAccountId: number;
    roundingMethod: string;
    description: string;
    activated: boolean;
  };
}

interface SaleOrder {
  id: number;
  code: string;
  state: string;
  partnerId: number;
  type: string;
  partner: Partner;
  invoiceAddressId: number;
  deliveryAddressId: number;
  quotationDate: string;
  orderDate: string;
  quoteCreationDate: string;
  expireHoldDate: string;
  pricelistId: number;
  priceList: PriceList;
  currencyId: number;
  currency: Currency;
  paymentTermId: number;
  paymentTerm: PaymentTerm;
  promotionIds: number[];
  promotions: Promotion[];
  paymentMethod: string;
  deliveryType: string;
  commitmentDate: string;
  warehouseId: number;
  warehouse: Warehouse;
  deliveryStatus: string;
  invoiceStatus: string;
  campaignId: number;
  salePersonIds: number[];
  saleUserIds: number[];
  saleUser: SaleUser[];
  numberOrder: number;
  discount: number;
  discountComputeType: string;
  note: string;
  branchId: number;
  deliveryPolicy: string;
  hasOrderReject: boolean;
  totalPrice: number;
  saleOrderLines: SaleOrderLine[];
  computeTaxInfo: ComputeTaxInfo;
  isValidInventoryQty: boolean;
  isSplit: boolean;
  isRetail: boolean;
  scopeType: string;
  isPolicyException: boolean;
  isOptionPrice: boolean;
}
interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort;
  paged: boolean;
  unpaged: boolean;
  pageNumber: number;
  pageSize: number;
}

interface ApiResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: SaleOrder[];
  number: number;
  sort: Sort;
  first: boolean;
  pageable: Pageable;
  numberOfElements: number;
  last: boolean;
  empty: boolean;
}

interface Response {
  message: string;
  traceId: string;
  data: ApiResponse;
}

export type OrderResult = { kind: "ok", response: Response } | { kind: "bad-data", response: Response };
