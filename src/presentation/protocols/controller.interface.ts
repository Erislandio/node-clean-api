import { HttpRequest, HttpResponse } from './http.interface'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
