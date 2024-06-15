// export interface Root {
//     message: string
//     traceId: string
//     data: Data
//   }
  
  export interface InforAccount {
    id: number
    code: string
    name: string
    avatarUrl: string
    sharingMode: any
    businessSectorId: any
    businessSector: any
    isCompany: boolean
    email: string
    phoneNumber: string
    countryId: number
    country: string
    regionId: number
    region: string
    cityId: number
    city: string
    districtId: number
    district: string
    wardId: number
    ward: string
    address: string
    joinDate: string
    partnerTags: PartnerTag[]
    cardId: string
    birth: any
    gender: any
    website: any
    activated: boolean
    anotherAddress: AnotherAddress[]
    contacts: Contact[]
    bankAccounts: BankAccount[]
    branches: Branch[]
    merchantPicture: MerchantPicture
    note: any
    isCustomer: any
    isVendor: any
    isMerchant: boolean
    isB2c: any
    isOem: any
    isPaymentPartner: any
    isShippingPartner: any
    isB2b: any
    isAnotherPartner: any
    vendorActivated: any
    oemActivated: any
    b2cActivated: any
    anotherActivated: any
    shippingActivated: any
    paymentActivated: any
    merchantActivated: boolean
    b2bActivated: any
    status: string
    reasonReject: any
    sharingModeVendor: any
    sharingModeOem: any
    sharingModeB2c: any
    sharingModeAnother: any
    sharingModeShipping: any
    sharingModePayment: any
    sharingModeMerchant: string
    sharingModeB2b: any
    deleteContacts: any[]
    deleteAddress: any[]
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
    isVendor: any
    isMerchant: boolean
    isB2b: any
    isB2c: any
    isOem: any
    isPaymentPartner: any
    isShippingPartner: any
    isAnotherPartner: any
  }
  
  export interface AnotherAddress {
    id: number
    name: any
    addressType: string
    phoneNumber: any
    countryId: number
    country: string
    regionId: number
    region: string
    cityId: number
    city: string
    districtId: number
    district: string
    wardId: number
    ward: string
    address: string
    cloneAddressId: any
    isDefault: any
  }
  
  export interface Contact {
    id: number
    name: string
    title: string
    gender: string
    position: string
    email: string
    birth: string
    phoneNumber: string
    cardId: string
    avatarUrl: any
    cloneAddressId: any
  }
  
  export interface BankAccount {
    id: number
    bankId: number
    bank: string
    bankBranchId: any
    bankBranch: any
    accountNumber: string
    accountHolder: string
    logoUrl: any
    cloneBankAccountId: any
  }
  
  export interface Branch {
    id: number
    code: string
    name: string
  }
  
  export interface MerchantPicture {
    id: number
    partnerId: number
    portrait: string
    personalIdentificationDocs: PersonalIdentificationDocs
    storeImage: string | undefined[]
    attachedFiles: AttachedFiles
  }
  
  export interface PersonalIdentificationDocs {
    files: File[]
  }
  
  export interface File {
    nameFile: string
    url: string
  }
  
  export interface AttachedFiles {
    files: File2[]
  }
  
  export interface File2 {
    nameFile: string
    url?: string
  }
  