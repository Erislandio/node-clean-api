import { MissingParamError } from './errors/missingParamError'
import { badRequest } from './helpers/httpHelper'
import { httpRequest, HttpResponse } from './protocols/http.interface'

export class SingUpController {
  public handle (httpRequest: httpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return null
  }
}
