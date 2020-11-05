import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          id: 'valid_id',
          email: 'any@email.com',
          name: 'any_name',
          password: 'any_pass',
          passwordConfirmation: 'any_pass'
        }
      }

      return new Promise(resolve => resolve(httpResponse))
    }
  }

  return new ControllerStub()
}

const makeSut = (stub: Controller): Controller => {
  const sut = new LogControllerDecorator(stub)

  return sut
}

describe('Log controller decorator', () => {
  const controllerStub = makeControllerStub()
  const sut = makeSut(controllerStub)
  test('Should call controller handle', async () => {
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: {
        email: 'any@email.com',
        name: 'any_name',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const httpRequest = {
      body: {
        email: 'any@email.com',
        name: 'any_name',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(
      {
        statusCode: 200,
        body: {
          id: 'valid_id',
          email: 'any@email.com',
          name: 'any_name',
          password: 'any_pass',
          passwordConfirmation: 'any_pass'
        }
      }
    )
  })
})
