export interface Root {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Content[];
  number: number;
  sort: Sort;
  first: boolean;
  pageable: Pageable;
  numberOfElements: number;
  last: boolean;
  empty: boolean;
}

export interface Content {
  id: number;
  code: string;
  name: string;
  countryId: number;
  countryName: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  administrativeUnitId: number;
  administrativeRegionId: number;
  regionName: string;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort2;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort2 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface Response {
  message: string;
  traceId: string;
  data: Root;
  errorCodes: ErrorCode[];
}
export type OrderCityResult =
  | { kind: "ok"; response: Response }
  | { kind: "bad-data"; response: Response };

export interface Root1 {
  id: number;
  partnerId: number;
  phoneNumber: string;
  addressType: string;
  country: Country;
  region: Region;
  city: City;
  district: District;
  ward: Ward;
  address: string;
  isDefault: boolean;
}

export interface Country {
  id: number;
  name: string;
}

export interface Region {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
}

export interface Ward {
  id: number;
  name: string;
}
export interface Response1 {
  message: string;
  traceId: string;
  data: Root1;
  errorCodes: ErrorCode[];
}
export type OrderListAddressResult =
  | { kind: "ok"; response: Response1 }
  | { kind: "bad-data"; response: Response1 };

export interface Root2 {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Content1[];
  number: number;
  sort: Sort1;
  first: boolean;
  pageable: Pageable1;
  numberOfElements: number;
  last: boolean;
  empty: boolean;
}

export interface Content1 {
  id: number;
  code: string;
  name: string;
  alias: string;
  countryId: number;
  countryName: string;
  cityId: number;
  cityName: string;
  description: string;
  isActive: boolean;
}

export interface Sort1 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable1 {
  offset: number;
  sort: Sort3;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort3 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface Response2 {
  message: string;
  traceId: string;
  data: Root;
  errorCodes: ErrorCode[];
}
export type OrderDistrictResult =
  | { kind: "ok"; response: Response2 }
  | { kind: "bad-data"; response: Response2 };

export interface Root3 {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Content3[];
  number: number;
  sort: Sort4;
  first: boolean;
  pageable: Pageable3;
  numberOfElements: number;
  last: boolean;
  empty: boolean;
}

export interface Content3 {
  id: number;
  code: string;
  name: string;
  isActive: boolean;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  districtCode: string;
  administrativeUnitId: string;
}

export interface Sort4 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable3 {
  offset: number;
  sort: Sort5;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort5 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface Response3 {
  message: string;
  traceId: string;
  data: Root3;
  errorCodes: ErrorCode[];
}
export type OrderWardResult =
  | { kind: "ok"; response: Response3 }
  | { kind: "bad-data"; response: Response3 };
