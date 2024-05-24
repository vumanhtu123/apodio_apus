import { ErrorCode } from "../errors"
export interface Root {
    message: string
    traceId: string
    data: Data
    errorCodes: ErrorCode[]
  }
  
  export interface Data {
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
    avatarUrl: string
    code: string
    name: string
    merchantName: any
    email: string
    phoneNumber: string
    address?: string
    isCompany: boolean
    country?: string
    region?: string
    city?: string
    district?: string
    ward?: string
    activated: boolean
    isCustomer: any
    isVendor: boolean
    isMerchant?: boolean
    isB2c?: boolean
    isOem?: boolean
    isPaymentPartner?: boolean
    isShippingPartner?: boolean
    isB2b?: boolean
    isAnotherPartner?: boolean
    partnerTags: PartnerTag[]
    businessSector: any
    dayRequest: any
    request: any
    status: any
    createdBy: string
    vendorActivated: boolean
    oemActivated?: boolean
    b2cActivated?: boolean
    anotherActivated?: boolean
    shippingActivated?: boolean
    paymentActivated?: boolean
    merchantActivated?: boolean
    b2bActivated?: boolean
    reason: any
  }
  
  export interface PartnerTag {
    id: number
    code: string
    name: string
    description: any
    activated: boolean
    createdAt: any
    createdBy: any
    isCustomer: any
    isVendor?: boolean
    isMerchant?: boolean
    isB2b?: boolean
    isB2c?: boolean
    isOem?: boolean
    isPaymentPartner?: boolean
    isShippingPartner?: boolean
    isAnotherPartner?: boolean
  }
  
  export type VendorResult = { kind: "ok", result: Root } | { kind: "bad-data", result: Root };