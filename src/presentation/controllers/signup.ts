import { InvalidParamError } from './errors/invalidParamError'
import { MissingParamError } from './errors/missingParamError'
import { ServerError } from './errors/serverError'
import { badRequest } from './helpers/httpHelper'
import { Controller } from './protocols/controller.interface'
import { EmailValidator } from './protocols/emailValidator.interface'
import { HttpRequest, HttpResponse } from './protocols/http.interface'

export class SingUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {

  }

  public handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (!this.emailValidator.isValid(httpRequest.body.email)) {
        return badRequest(new InvalidParamError('email'))
      }

      return null
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
