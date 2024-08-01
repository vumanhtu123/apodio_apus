import { ErrorCode } from "../errors"

export interface Root {
    data: Data
    message: string
    traceId: string
    errorCodes: ErrorCode[]
  }
  
  export interface Data {
    id: number
    name: string
  }
  export type AttributeNameResult = { kind: "ok", response: Root } | { kind: "bad-data", response: Root };