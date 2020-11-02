import { BcryptAdpter } from './bycriptAdpter'
import bcrypt from 'bcrypt'

const makeSut = (): BcryptAdpter => {
  const salt = 12
  return new BcryptAdpter(salt)
}

describe('BcryotAdpter', () => {
  test('Shoul call bycript with corret value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })
})
