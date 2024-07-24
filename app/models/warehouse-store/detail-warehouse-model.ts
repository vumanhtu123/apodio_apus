export interface Root {
    message: string
    traceId: string
    data: DataDetailWarehouse
  }
  
  export interface DataDetailWarehouse {
    id: number
    name: string
    code: string
    state: string
    companyId: any
    company: any
    branchId: number
    branch: any
    sourceProductType: string
    address: string
    areaCode: string
    hasAdditionalInfo: boolean
    additionalInfo: AdditionalInfo
    hasConditionStorage: boolean
    conditionStorage: ConditionStorage
    viewLocationId: any
    stockLocationId: number
    stockLocation: StockLocation
    inputLocationId: number
    inputLocation: InputLocation
    qualityLocationId: number
    qualityLocation: QualityLocation
    packingLocationId: number
    packingLocation: PackingLocation
    outputLocationId: number
    outputLocation: OutputLocation
    samLocationId: any
    samLocation: SamLocation
    pbmLocationId: any
    pbmLocation: PbmLocation
    action: string
    note: string
    isApproved: any
    vendorLocationId: number
    vendorLocation: VendorLocation
    customerLocationId: number
    customerLocation: CustomerLocation
    stockLocations: StockLocation2[]
  }
  
  export interface AdditionalInfo {
    latitude: any
    longitude: any
    height: any
    heightUom: any
    length: any
    lengthUom: any
    width: any
    widthUom: any
    weightCapacity: any
    weightCapacityUom: any
    scene: any
  }
  
  export interface ConditionStorage {
    standardTemperature: any
    minTemperature: any
    standardHumidity: any
  }
  
  export interface StockLocation {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: any
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: any
    note: any
  }
  
  export interface InputLocation {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: any
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: any
    note: any
  }
  
  export interface QualityLocation {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: any
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: any
    note: any
  }
  
  export interface PackingLocation {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: any
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: any
    note: any
  }
  
  export interface OutputLocation {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: any
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: any
    note: any
  }
  
  export interface SamLocation {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: any
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: any
    note: any
  }
  
  export interface PbmLocation {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: any
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: any
    note: any
  }
  
  export interface VendorLocation {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: any
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: any
    note: any
  }
  
  export interface CustomerLocation {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: any
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: any
    note: any
  }
  
  export interface StockLocation2 {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation?: ParentStockLocation
    type: string
    isScrapLocation?: boolean
    isReturnLocation?: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: any
    note?: string
  }
  
  export interface ParentStockLocation {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: any
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: any
    note: any
  }
  