export interface LoginResponse {
  message: string;
  traceId: string;
  data: Data;
}

export interface Data {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expiresIn: number;
  scopes: string[];
  userId: number;
  jti: string;
}

export type LoginResult =
  | { kind: "ok"; response: LoginResponse }
  | { kind: "bad-data"; response: LoginResponse };
