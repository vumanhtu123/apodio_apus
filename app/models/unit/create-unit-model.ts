import { ErrorCode } from "../errors"


export interface Root {
  message: string
  traceId: string
  data: Data
  errorCodes: ErrorCode[]
}

export interface Data {
  id: number
  name: string
}

export type CreateUnitResult = { kind: "ok", result: Root } | { kind: "bad-data", result: Root };