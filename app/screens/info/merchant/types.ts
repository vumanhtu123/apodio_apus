export interface Root {
  message: string;
  traceId: string;
  data: Data;
}

export interface Data {
  merchantUUID: string;
  merchantType: string;
  accountId: string;
  businessSector: BusinessSector;
  businessLicense: any;
  merchantPhone: string;
  merchantName: string;
  merchantCode: string;
  paperType: string;
  paperNumber: string;
  issuedDate: string;
  expiredDate: string;
  issuedPlace: string;
  province: Province;
  district: District;
  precinct: Precinct;
  address: string;
  qrCode: string;
  bank: Bank;
  bankAccountName: string;
  bankAccountNo: string;
  bankBranch: string;
  status: string;
  email: any;
  gender: string;
  createdAt: string;
  portraitImage: PortraitImage;
  fontIdImage: FontIdImage;
  backIdImage: BackIdImage;
}

export interface BusinessSector {
  businessSectorUUID: string;
  businessSectorName: string;
}

export interface Province {
  areaCode: string;
  areaName: string;
}

export interface District {
  areaCode: string;
  areaName: string;
}

export interface Precinct {
  areaCode: string;
  areaName: string;
}

export interface Bank {
  bankId: number;
  bankName: string;
}

export interface PortraitImage {
  fileKey: string;
  originalName: string;
  extension: string;
  fileSize: number;
  filePath: string;
  downloadPath: string;
}

export interface FontIdImage {
  fileKey: string;
  originalName: string;
  extension: string;
  fileSize: number;
  filePath: string;
  downloadPath: string;
}

export interface BackIdImage {
  fileKey: string;
  originalName: string;
  extension: string;
  fileSize: number;
  filePath: string;
  downloadPath: string;
}
