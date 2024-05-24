import { ErrorCode } from "../../services/api";

export interface Root {
  message: string;
  traceId: string;
  errorCodes: ErrorCode[];
  data: Data;
}

export interface Data {
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
  code: string;
  name: string;
  activated: boolean;
  companyId: number;
  branchId: number;
  createdAt: string;
  createdBy: number;
  userCreatedBy: UserCreatedBy;
  isUsing: any;
}

export interface UserCreatedBy {
  id: number;
  code: any;
  name: string;
}

export type TagResult =
  | { kind: "ok"; response: Data }
  | { kind: "bad-data"; response: Root };
