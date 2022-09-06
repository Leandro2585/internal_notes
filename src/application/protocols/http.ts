export type HttpResponse<T = any> = {
  status_code: number
  data: T
}