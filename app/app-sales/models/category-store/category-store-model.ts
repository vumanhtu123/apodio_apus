export interface DataCategory {
    message: string
    traceId: string
    page: number
    size: number
    sort: string
    totalElements: number
    totalPages: number
    numberOfElements: number
    data: Content[]
}
export interface Content {
    id: number
    name?: string
    imageUrl: any
}