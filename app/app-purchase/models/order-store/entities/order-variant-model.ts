import { ErrorCode } from "../../errors";

export interface Root {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Content[];
  number: number;
  sort: Sort;
  first: boolean;
  pageable: Pageable;
  numberOfElements: number;
  last: boolean;
  empty: boolean;
}

export interface Content {
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

export interface ProductTemplate {
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

export interface UomGroup {
  id: number;
  code: string;
  name: string;
  uomOriginId: number;
  uomOriginName: string;
  uomGroupLineItems: UomGroupLineItem[];
}

export interface UomGroupLineItem {
  id: number;
  uomId: number;
  uomName: string;
  conversionRate: number;
  accuracy: number;
  uomLineType: string;
}

export interface BaseProductPackingLine {
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

export interface ProductPackingLine {
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

export interface SaleUom {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Warehouse {
  id: number;
  name: string;
  quantity: number;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort2;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort2 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface Response {
  message: string;
  traceId: string;
  data: Root;
  errorCodes: ErrorCode[];
}
export type OrderVariantResult =
  | { kind: "ok"; response: Response }
  | { kind: "bad-data"; response: Response };
  export interface Response1 {
    message: string
    traceId: string
    data: Root3
    errorCodes: ErrorCode[]
  }
  
  export interface Root3 {
    productId: number
    quantity: number
    price: number
  }
  export type PriceVariantResult = { kind: "ok", response: Response1 } | { kind: "bad-data", response: Response1 };