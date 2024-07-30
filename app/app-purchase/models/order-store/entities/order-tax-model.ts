export interface InputTaxModel {
  id: string;
  label: string;
}

export interface TaxModel {
  content: Content[];
  page: number;
  size: number;
  sort: string;
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
}

export interface Content {
  id: number;
  sequence: number;
  name: string;
  scopeType: string;
  type: string;
  countryId?: number;
  description: string;
  isActive: boolean;
}
