import { ErrorCode } from "../errors"

export interface Response {
    message: string
    traceId: string
    data: Root[]
    errorCodes: ErrorCode[]
  }

export interface Root {
    id: number
    code: string
    name: string
    description: any
    sequence: number
    activated: boolean
    companyId: any
    branchId: any
    isInternal: any
    attributeOutputList?: AttributeOutputList[]
    createdAt: string
    createdBy?: number
    userCreatedBy: any
    isUsing: any
    isSource: any
    existsInBranch: boolean
  }
  
  export interface AttributeOutputList {
    id: number
    creationMode: string
    name: string
    code: string
    sequence: number
    attributeCategorySequence: any
    attributeCategoryId: number
    viewType: string
    displayType: string
    description: any
    companyId: any
    branchId: any
    productAttributeCategory: any
    productAttributeValue?: ProductAttributeValue[]
    activated: boolean
    createdAt: string
    createdBy: any
    userCreatedBy: any
    isUsing: any
    sequenceOfCategory: any
    existsInBranch: boolean
  }
  
  export interface ProductAttributeValue {
    id: number
    sequence: number
    value: string
    productAttributeId: number
    activated: boolean
  }

  export type AttributeDataResult = { kind: "ok", response: Response } | { kind: "bad-data", response: Response };