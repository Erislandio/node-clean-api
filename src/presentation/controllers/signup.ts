import { MissingParamError } from './errors/missingParamError'
import { badRequest } from './helpers/httpHelper'
import { httpRequest, HttpResponse } from './protocols/http.interface'

export class SingUpController {
  public handle (httpRequest: httpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }

    return null
  }
}
