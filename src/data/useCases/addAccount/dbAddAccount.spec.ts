import { Encrypter } from './addAccountProtocols'
import { DbAddAccount } from './dbAddAccount'

type SutTypes = {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'))
    }
  }

  const encrypterStub = new EncrypterStub()
  return encrypterStub
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
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

  test('Should throws if encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut()

    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    const account = sut.add(accountData)
    await expect(account).rejects.toThrow()
  })
})
