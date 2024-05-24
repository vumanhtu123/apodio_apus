import { ErrorCode } from "../errors"
export interface DataProduct {
    message: string
    traceId: string
    page: number
    size: number
    sort: string
    totalElements: number
    totalPages: number
    numberOfElements: number
    data: Content[]
    errorCodes: ErrorCode[]
}
export interface Content {
    id: number
    name?: string
    imageUrls: any
    sku : string
    price : number
    variantCount : number
}

export type ProductResult = { kind: "ok", response: DataProduct } | { kind: "bad-data", response: DataProduct };