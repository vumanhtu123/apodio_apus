export interface Root {
    message: string
    traceId: string
    data: Brand
  }
  
  export interface Brand {
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
    code: string
    name: string
    imageUrl: string
    description: string
    activated: boolean
    type: string
    companyId?: number
    branchId?: number
    brandOwnerId: number
    brandOwnerResponse: BrandOwnerResponse
    isUsing: any
    createdAt: string
    createdBy?: number
    userCreatedBy?: UserCreatedBy
  }
  
  export interface BrandOwnerResponse {
    id: number
    code: string
    name: string
    description: string
    imageUrl?: string
    activated: boolean
    branchId: any
    companyId: any
    isInternal: boolean
    brandOutputList: any
    createdAt: string
    createdBy: number
    userCreatedBy: any
  }
  
  export interface UserCreatedBy {
    id: number
    code: any
    name: string
  }
  
  export type BrandResult = { kind: "ok", result: Root } | { kind: "bad-data", result: Root };