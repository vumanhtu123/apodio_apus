import { ErrorCode } from "../errors"
export interface DataProduct {
    message: string
    traceId: string
    page: number
    size: number
    sort: string
    totalElements: number
    totalPages: number
    numberOfElements: number
    data: Content
    errorCodes: ErrorCode[]
}

export interface Content {
    id: number
    sku: string
    upc: any
    name: string
    productCategoryId: number
    productCategory: ProductCategory
    imageUrls: string[]
    description: string
    purchaseOk: boolean
    saleOk: boolean
    managementForm: string
    brandId: any
    brand: any
    attributeCategory: AttributeCategory[]
    productTags: any[]
    vendors: Vendor[]
    uomId: any
    uom: any
    uomGroupId: number
    uomGroup: UomGroup
    hasVariantInConfig: boolean
    hasUomGroupInConfig: boolean
    costPrice: number
    listPrice: number
    wholesalePrice: WholesalePrice[]
    retailPrice: RetailPrice[]
    productVariants: ProductVariant[]
    scene: any
    baseTemplatePackingLine: BaseTemplatePackingLine
    templatePackingLines: TemplatePackingLine[]
  }
  
  export interface ProductCategory {
    id: number
    name: string
  }
  
  export interface AttributeCategory {
    id: number
    name: string
    sequence: number
    attributeOutputDtos: any
    attributeOutputList: AttributeOutputList[]
  }
  
  export interface AttributeOutputList {
    id: number
    creationMode: string
    name: string
    code: string
    sequence: number
    attributeCategorySequence: any
    attributeCategoryId: number
    viewType: string
    displayType: string
    description: any
    companyId: any
    branchId: any
    productAttributeCategory: any
    productAttributeValue: ProductAttributeValue[]
    activated: boolean
    createdAt: string
    createdBy: number
    userCreatedBy: any
    isUsing: any
    sequenceOfCategory: any
    existsInBranch: boolean
  }
  
  export interface ProductAttributeValue {
    id: number
    sequence: number
    value: string
    productAttributeId: number
    activated: boolean
  }
  
  export interface Vendor {
    id: number
    vendorCode: string
    vendorName: string
    productVendorCode: any
    vendorId: number
    phoneNumber: string
    avatarUrl: string
  }
  
  export interface UomGroup {
    name: string
    originalUnitId: number
    originalUnit: OriginalUnit
    uomGroupLines: UomGroupLine[]
  }
  
  export interface OriginalUnit {
    id: number
    name: string
    uomGroupLineId: number
  }
  
  export interface UomGroupLine {
    id: number
    code: string
    unitId: number
    unitGroupId: any
    unitName: string
    conversionRate: number
    accuracy: any
    uomLineType: any
    isUsing: boolean
  }
  
  export interface WholesalePrice {
    min: number
    price: number
  }
  
  export interface RetailPrice {
    min: number
    price: number
  }
  
  export interface ProductVariant {
    id: number
    name: string
    sku: string
    imageUrls: string[]
    attributeValues: AttributeValue[]
    retailPrice: RetailPrice2[]
    costPrice: number
    listPrice: number
    wholesalePrice: WholesalePrice2[]
    baseProductPackingLine: BaseProductPackingLine
    productPackingLines: ProductPackingLine[]
  }
  
  export interface AttributeValue {
    productAttributeId: number
    productAttributeValueId: number
  }
  
  export interface RetailPrice2 {
    min: number
    price: number
  }
  
  export interface WholesalePrice2 {
    min: number
    price: number
  }
  
  export interface BaseProductPackingLine {
    uomGroupLineId: number
    amount: number
    volume: number
    weight: number
  }
  
  export interface ProductPackingLine {
    uomGroupLineId?: number
    amount?: number
    volume: number
    weight: number
  }
  
  export interface BaseTemplatePackingLine {
    id: number
    uomGroupLineId: number
    productId: any
    amount: number
    uomLineType: string
    length: any
    high: any
    wide: any
    volume: number
    weight: number
    uomGroupLineOutput: UomGroupLineOutput
  }
  
  export interface UomGroupLineOutput {
    id: number
    code: any
    unitId: number
    unitGroupId: number
    unitName: string
    conversionRate: number
    accuracy: number
    uomLineType: string
    isUsing: any
  }
  
  export interface TemplatePackingLine {
    id: number
    uomGroupLineId: number
    productId: any
    amount: number
    uomLineType: string
    length: any
    high: any
    wide: any
    volume: number
    weight: number
    uomGroupLineOutput: UomGroupLineOutput2
  }
  
  export interface UomGroupLineOutput2 {
    id: number
    code: string
    unitId: number
    unitGroupId: number
    unitName: string
    conversionRate: number
    accuracy: any
    uomLineType: string
    isUsing: any
  }  

  export type ProductDetailResult = { kind: "ok", response: DataProduct } | { kind: "bad-data", response: DataProduct };
  