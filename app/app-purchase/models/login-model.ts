export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expiresIn: number;
  scopes: string[];
  userId: number;
  tenantId: string;
  jti: string;
}
