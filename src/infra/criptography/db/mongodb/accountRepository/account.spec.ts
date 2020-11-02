import { AccountMongoRepository } from './account'
import { AddAccount } from './accountProtocols'
import { MongoHelper } from '../helpers/mongoHelper'

const makeSut = (): AddAccount => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Should return an account on success', async () => {
    const sut = makeSut()

    const accountData = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_pass'
    }

    const account = await sut.add(accountData)
    expect(account).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@email.com')
    expect(account.password).toBe('any_pass')
  })
})
