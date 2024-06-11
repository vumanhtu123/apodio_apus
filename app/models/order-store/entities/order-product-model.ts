import { ErrorCode } from "../../errors";

export interface Root {
  totalElements: number;
  totalPages: number;
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
  uom: Uom;
  variantCount: number;
  quantityInventory: number;
  productImage: string[];
}

export interface Uom {
  id: number;
  name: string;
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
  paged: boolean;
  unpaged: boolean;
}

export interface Sort2 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Response {
  message: string;
  traceId: string;
  data: Root[];
  errorCodes: ErrorCode[];
}
export type OrderProductResult =
  | { kind: "ok"; response: Response }
  | { kind: "bad-data"; response: Response };
