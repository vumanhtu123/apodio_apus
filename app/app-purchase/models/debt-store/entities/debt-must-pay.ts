export interface RootObject {
    message: string;
    traceId: string;
    data: DataMustPay;
  }
export interface DataMustPay {
    data: any,
    content: Content[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  }
export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  }
export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  }
export interface Content {
    partner: Partner;
    type: string;
    amountTotal: number;
    amountPayment: number;
    debtAmount: number;
  }
export interface Partner {
    id: number;
    name: string;
    code: string;
  }

interface Response {
    message: string;
    traceId: string;
    data: DataMustPay;
}
export interface RootMustPayDebtDetail {
  message: string
  traceId: string
  data: DataMustPayDebtDetail
}

export interface DataMustPayDebtDetail {
  nearestDueDate: any
  debtAmount: number
}

  
export type ResponseDebtResult = {kind: "ok", response: Response} | {kind: "bad-data", response: Response}
