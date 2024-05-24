export interface Root {
  message: string;
  traceId: string;
  data: Data;
}

export interface Data {
  staffUUID: string;
  staffCode: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  qrCode: string;
  merchant: Merchant;
  subMerchant: SubMerchant;
}

export interface Merchant {
  merchantUUID: string;
  merchantName: string;
  merchantCode: string;
  phoneNumber: string;
  address: string;
}

export interface SubMerchant {
  subMerchantUUID: any;
  subMerchantCode: string;
  subMerchantName: string;
  subMerchantPhone: string;
  address: string;
  numberOfStaff: any;
  description: string;
}
