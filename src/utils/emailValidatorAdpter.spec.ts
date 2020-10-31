import { EmailValidatorAdapter } from './emailValidatorAdpter'
import validator from 'validator'

jest.mock('validator', () => (
  {
    isEmail (): boolean {
      return true
    }
  }
))

const makeSut = (): EmailValidatorAdapter => new EmailValidatorAdapter()

describe('Email validator adpater', () => {
  test('Should return false id validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid: boolean = sut.isValid('invalid_email@email.com')

    expect(isValid).toBe(false)
  })

  test('Should return true id validator returns true', () => {
    const sut = makeSut()
    const isValid: boolean = sut.isValid('valid_email@email.com')

    expect(isValid).toBe(true)
  })

  test('Should call validator with valid email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    const isValid: boolean = sut.isValid('any_email@email.com')

    expect(isValid).toBe(true)
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
