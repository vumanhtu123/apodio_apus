interface BaseResponse<T, E> {
  message: string;
  traceId: string;
  data: T;
  errorCodes: E[];
}
interface ErrorCode {
  code: string;
  message: string;
}
