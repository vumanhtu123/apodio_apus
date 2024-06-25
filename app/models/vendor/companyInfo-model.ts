import { ErrorCode } from "../errors"
export interface Response {
    message: string
    traceId: string
    data: Root
    errorCodes: ErrorCode[]
  }

export interface Root {
    activated: boolean
    address: string
    bankAccountOutputs: BankAccountOutput[]
    city: string
    cityId: number
    code: any
    country: string
    countryId: number
    currency: string
    currencyFullName: string
    currencyId: number
    dateType: string
    decimalSeparator: string
    description: any
    district: string
    districtId: number
    domain: string
    email: string
    firstName: string
    floatRounding: any
    id: number
    language: string
    languageCode: string
    languageId: number
    lastName: string
    logo: string
    name: string
    parent: any
    parentId: any
    phone: string
    position: string
    secondaryCurrencies: string[]
    secondaryCurrencyIds: number[]
    symbol: string
    taxCode: string
    thousandSeparator: string
    timezone: string
    username: string
    ward: string
    wardId: number
  }
  
  export interface BankAccountOutput {
    accountHolder: string
    accountNumber: string
    bank: string
    bankBranch: string
    bankBranchId: number
    bankId: number
    cloneBankAccountId: any
    id: number
    logoUrl?: string
  }
  export type CompanyResult = { kind: "ok", result: Response } | { kind: "bad-data", result: Response };