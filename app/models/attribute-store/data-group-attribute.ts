import { ErrorCode } from "../errors"

export interface Root {
    message: string
    traceId: string
    errorCodes: ErrorCode
  }

  export type AttributeDataGroupResult = { kind: "ok", response: Root } | { kind: "bad-data", response: Root };