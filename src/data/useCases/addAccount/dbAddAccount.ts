import { AddAccountRespository } from '../../protocols/addAccontRepository'
import { AccountModel, AddAccount, Encrypter, AddAccountModel } from './addAccountProtocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRespository
  ) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    return this.addAccountRepository.add(Object.assign({}, account, {
      password: hashedPassword
    }))
  }
}
