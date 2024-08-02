import { ErrorCode } from "../errors"

export interface Response {
    message: string
    traceId: string
    data: Root
    errorCodes: ErrorCode[]
  }

export interface Root {
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
    code?: string
    name: string
    description: any
    sequence: number
    activated: boolean
    companyId: any
    branchId: any
    isInternal: any
    attributeOutputList: any
    createdAt: string
    createdBy?: number
    userCreatedBy: any
    isUsing: any
    isSource: any
    existsInBranch: boolean
  }
  
  export type AttributeResult = { kind: "ok", response: Response } | { kind: "bad-data", response: Response };