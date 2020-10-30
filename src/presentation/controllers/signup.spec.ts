import { SingUpController } from './signup'

describe('Signup Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SingUpController()

    const httpRequest = {
      body: {
        name: 'Erislandio',
        email: 'any@email.com',
        password: 'Er1sl@ndio',
        passwordConfirmation: 'Er1sl@ndio'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
})
