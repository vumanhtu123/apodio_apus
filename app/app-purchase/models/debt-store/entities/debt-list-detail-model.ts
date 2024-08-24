export interface RootListDetailDebt {
    message: string
    traceId: string
    data: ListDetailDataDebt
  }
  
  export interface ListDetailDataDebt {
    content: Content[]
    pageable: Pageable
    totalPages: number
    last: boolean
    totalElements: number
    size: number
    number: number
    sort: Sort2
    first: boolean
    numberOfElements: number
    empty: boolean
  }
  
  export interface Content {
    orderId: number
    partner: Partner
    code: string
    amountTotal: number
    amountWarehouse: number
    amountPayment: number
    paymentDate: any
    debtAmount: number
    dueDate: any
    orderDate: any
    moveType: string
  }
  
  export interface Partner {
    id: number
    name: string
    code: string
  }
  
  export interface Pageable {
    sort: Sort
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  
  export interface Sort {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  
  export interface Sort2 {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }

  export interface RootValuePay {
    message: string
    traceId: string
    data: number
  }