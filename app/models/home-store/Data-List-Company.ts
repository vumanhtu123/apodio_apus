export interface DataListCompany {
    message: string
    traceId: string
    data: Daum[]
  }
  
  export interface Daum {
    createdAt: string
    id: number
    name: string
    domain: string
    owner: any
    description: any
    isActive: boolean
  }
  