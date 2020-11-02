import { AccountModel, AddAccount, AddAccountModel } from './accountProtocols'

export class AccountMongoRepository implements AddAccount {
  public async add (account: AddAccountModel): Promise<AccountModel> {
    return new Promise(resolve => resolve(Object.assign({}, account, { id: 'any_id' })))
  }
}
