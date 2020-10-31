import { AddAccountRespository } from '../../protocols/addAccontRepository'
import { AccountModel, AddAccount, Encrypter, AddAccountModel } from './addAccountProtocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRespository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = this.addAccountRepository.add(Object.assign({}, accountData, {
      password: hashedPassword
    }))

    return account
  }
}
