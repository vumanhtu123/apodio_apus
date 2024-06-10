import { ErrorCode } from "../errors"

export interface Root {
    totalElements: number
    totalPages: number
    size: number
    content: Content[]
    number: number
    sort: Sort
    first: boolean
    pageable: Pageable
    numberOfElements: number
    last: boolean
    empty: boolean
  }
  
  export interface Content {
    id: number
    code: string
    name: string
    countryId: number
    countryName: string
    nameEn: string
    fullName: string
    fullNameEn: string
    codeName: string
    administrativeUnitId: number
    administrativeRegionId: number
    regionName: string
  }
  
  export interface Sort {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  
  export interface Pageable {
    offset: number
    sort: Sort2
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  
  export interface Sort2 {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  export interface Response {
    message: string
    traceId: string
    data: Root[]
    errorCodes: ErrorCode[]
  }
  export type OrderCityResult = { kind: "ok", response: Response } | { kind: "bad-data", response: Response };
