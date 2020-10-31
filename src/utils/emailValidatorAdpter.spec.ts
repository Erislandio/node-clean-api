import { EmailValidatorAdapter } from './emailValidatorAdpter'
import validator from 'validator'

jest.mock('validator', () => (
  {
    isEmail (): boolean {
      return true
    }
  }
))

describe('Email validator adpater', () => {
  test('Should return false id validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid: boolean = sut.isValid('invalid_email@email.com')

    expect(isValid).toBe(false)
  })

  test('Should return true id validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid: boolean = sut.isValid('valid_email@email.com')

    expect(isValid).toBe(true)
  })

  test('Should call validator with valid email', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    const isValid: boolean = sut.isValid('any_email@email.com')

    expect(isValid).toBe(true)
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
