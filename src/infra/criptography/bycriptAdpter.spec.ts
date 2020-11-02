import { BcryptAdpter } from './bycriptAdpter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12

const makeSut = (): BcryptAdpter => {
  return new BcryptAdpter(salt)
}

describe('BcryptAdapter', () => {
  test('Should call bycript with corret value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })

  test('Should throws if bycript throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promisse = sut.encrypt('any_value')
    await expect(promisse).rejects.toThrow()
  })
})
