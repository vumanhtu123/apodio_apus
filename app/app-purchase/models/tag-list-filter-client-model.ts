// export interface Root {
//     message: string
//     traceId: string
//     data: Data
//   }
  
  export interface TagList {
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
    description?: string
    activated: boolean
    createdAt?: string
    createdBy?: string
    isCustomer: any
    isVendor: any
    isMerchant: any
    isB2b: any
    isB2c: boolean
    isOem: any
    isPaymentPartner: any
    isShippingPartner: any
    isAnotherPartner: any
  }
  