import { ErrorCode } from "../errors"


export interface Root {
  message: string
  traceId: string
  data: Data
  errorCodes: ErrorCode[]
}

export interface Data {
  content: Content[]
  page: number
  size: number
  sort: string
  totalElements: number
  totalPages: number
  numberOfElements: number
}

export interface Content {
  id: number
  name: string
}

export type UnitGroupResult = { kind: "ok", result: Root } | { kind: "bad-data", result: Root } | { kind: "bad-data", result: any};