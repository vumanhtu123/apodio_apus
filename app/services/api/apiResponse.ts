export interface ApiResponse<T> {
    kind: "ok" | "bad-data";
    result?: T;
    message?: string;
  }