import { Encrypter } from '../../protocols/encypter'
import { DbAddAccount } from './dbAddAccount'

type SutTypes = {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'))
    }
  }

  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}

describe('Db AddAccount', () => {
  test('Should call Encypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()

    const encrypSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(encrypSpy).toHaveBeenCalledWith('valid_password')
  })
})
