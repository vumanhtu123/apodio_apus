import { ErrorCode } from "../errors"
export interface Root {
    name: string
    originalUnitId: number
    data: UnitGroupLine
    errorCodes: ErrorCode[]
  }
  
  export interface UnitGroupLine {
    id: number
    code: string
    name: string
    unitId: number
    conversionRate: number
    accuracy: number
  }

  export type CreateUnitGroupLineResult = { kind: "ok", result: Root } | { kind: "bad-data", result: Root } | { kind: "bad-data", result: any};