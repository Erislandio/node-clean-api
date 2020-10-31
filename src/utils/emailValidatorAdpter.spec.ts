import { EmailValidatorAdapter } from './emailValidatorAdpter'

describe('Email validator adpater', () => {
  test('Should reutnr false id validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid: boolean = sut.isValid('invalid_email@email.com')

    expect(isValid).toBe(false)
  })
})
