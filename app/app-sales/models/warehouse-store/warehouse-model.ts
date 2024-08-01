export interface Root {
    message: string
    traceId: string
    data: ResponseWarehouse
  }
  
  export interface ResponseWarehouse {
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
    name: string
    code: string
    state: string
    companyId: number
    company: any
    branchId: number
    branch: any
    sourceProductType: string
    address: string
    areaCode: string
    hasAdditionalInfo: boolean
    additionalInfo: any
    hasConditionStorage: boolean
    conditionStorage: any
    viewLocationId: any
    stockLocationId: number
    inputLocationId: number
    qualityLocationId: number
    packingLocationId: number
    outputLocationId: number
    samLocationId: any
    pbmLocationId: any
    action: string
    note: string
    isApproved: boolean
    vendorLocationId: number
    customerLocationId: number
    stockLocations: any
  }
  