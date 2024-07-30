export interface TaxLineModel {
  taxLines: TaxLine[];
  summaryItems: SummaryItem[];
  cashRounding: CashRounding;
}

export interface TaxLine {
  items: Item[];
  amount: number;
  untaxedAmount: number;
  discountAmount: number;
}

export interface Item {
  taxId: number;
  taxName: string;
  repartitions: Repartition[];
  amount: number;
  amountInTaxEntity: number;
  taxComputeType: string;
}

export interface Repartition {
  id: number;
  accountId: number;
  accountTagId: number;
  amount: number;
}

export interface SummaryItem {
  taxId: number;
  taxName: string;
  amount: number;
  amountInTaxEntity: number;
  taxComputeType: string;
}

export interface CashRounding {
  id: number;
  name: string;
  roundingPrecision: number;
  roundingStrategy: string;
  profitAccountId: number;
  lossAccountId: number;
  roundingMethod: string;
  description: string;
  activated: boolean;
}
