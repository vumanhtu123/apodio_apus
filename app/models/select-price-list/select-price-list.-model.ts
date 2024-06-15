// export interface Root {
//     message: string
//     traceId: string
//     data: Data
//   }
  
  export interface PriceListSelect {
    id: string,
    name: string, 
    priceListCategory: string
  }
  export interface PriceListResponse {
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
    currencyUnit: CurrencyUnit
    priceListCategory: PriceListCategory
    createdAt: string
    employee: Employee
    manager: any
    methodState: string
    state: string
    trackingState: string
    managerId: any
    employeeId: number
    currencyUnitId: number
    priceListCategoryId: number
  }
  
  export interface CurrencyUnit {
    id: number
    name: string
  }
  
  export interface PriceListCategory {
    id: number
    name: string
  }
  
  export interface Employee {
    id: number
    name: string
  }
  