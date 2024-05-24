import { ErrorCode } from "../errors"


export interface Root {
  message: string
  traceId: string
  data: Data
  errorCodes: ErrorCode[]
}

export interface Data {
  name: string
  originalUnitId: number
  originalUnit: OriginalUnit
  uomGroupLines: UomGroupLine[]
}

export interface OriginalUnit {
  id: number
  name: string
}

export interface UomGroupLine {
  id: number
  code: string
  unitId: number
  unitGroupId: any
  unitName: string
  conversionRate: number
  accuracy: number
  uomLineType: any
  isUsing: boolean
}


export type DetailUnitGroupResult = { kind: "ok", result: Root } | { kind: "bad-data", result: Root };