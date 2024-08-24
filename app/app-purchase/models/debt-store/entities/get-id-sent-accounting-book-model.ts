export interface Root {
    message: string
    traceId: string
    data: DataGetIdSentAccounting
  }
  
  export interface DataGetIdSentAccounting {
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
    description: any
    isUsedTaxReporting: any
    isDefault: boolean
  }