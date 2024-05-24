import { ErrorCode } from "../errors"

export interface RootUnit {
    message: string
    traceId: string
    data: DataUnit,
    errorCodes: ErrorCode[]
  }


export interface DataUnit {
    page: number,
    size: number,
    sort: string,
    totalElements: number,
    totalPages: number,
    numberOfElements: number,
    content: Array<DataContent>
}

export interface DataContent {
    id: number,
    name: string
}

export type UnitResult = { kind: "ok", result: RootUnit } | { kind: "bad-data", result: RootUnit };