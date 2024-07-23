export interface Root {
    message: string
    traceId: string
    data: DataNumberState
  }
  
  export interface DataNumberState {
    allQty: number
    approvedQty: number
    archiveQty: number
  }
  