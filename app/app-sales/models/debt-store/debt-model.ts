interface RootObject {
    message: string;
    traceId: string;
    data: DataDebt;
  }
  interface DataDebt {
    content: Content[];
    page: number;
    size: number;
    sort: string;
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
  }
  interface Content {
    id: number;
    amountPaid: number;
    code: string;
    name: string;
    merchantName?: string;
    email?: string;
    branchName?: string;
    address?: string;
    isCompany: boolean;
    country?: string;
    region?: string;
    valueOrder: number;
    district?: string;
    paymentDate?: string;
    activated?: boolean;
    isCustomer?: any;
    isVendor: boolean;
    isMerchant?: boolean;
    order: string;
    remainingDebt: number;
    isPaymentPartner?: any;
    day: string;
    isB2b?: any;
    isAnotherPartner?: any;
    partnerTags: PartnerTag[];
    businessSector?: any;
    dayRequest?: any;
    request?: any;
    status?: any;
    createdBy: string;
    vendorActivated: boolean;
    oemActivated?: any;
    b2cActivated?: any;
    anotherActivated?: any;
    shippingActivated?: any;
    paymentActivated?: any;
    merchantActivated?: boolean;
    b2bActivated?: any;
    reason?: any;
    isHaveDeliveryAddress: boolean;
    phoneNumber?: string;
    paymentTerm?: string;
    ward?: any;
  }
  interface PartnerTag {
    id: number;
    code: string;
    name: string;
    description?: string;
    activated: boolean;
    createdAt?: string;
    createdBy?: string;
    isCustomer?: any;
    isVendor?: boolean;
    isMerchant?: boolean;
    paymentTerm?: string;
    isB2c?: any;
    remainingDebt?: number;
    isPaymentPartner?: boolean;
    isShippingPartner?: any;
    isAnotherPartner?: any;
    isB2b?: boolean;
    order?: string;
    isOem?: any;
  }