export interface Root {
    message: string
    traceId: string
    data: DataListSelectAccountingBook
  }
  
  export interface DataListSelectAccountingBook {
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
    type: string
    defaultAccount: string
    currency: string
  }