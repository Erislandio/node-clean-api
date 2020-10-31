import { InvalidParamError, MissingParamError } from './errors'
import { badRequest, serverError } from './helpers/httpHelpers'
import { Controller,EmailValidator, HttpRequest, HttpResponse } from './protocols'

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

      const { password, passwordConfirmation, email } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }

      return null
    } catch (error) {
      return serverError()
    }
  }
}
