import { MongoHelper } from '../helpers/mongoHelper'
import { AccountModel, AddAccount, AddAccountModel } from './accountProtocols'

export class AccountMongoRepository implements AddAccount {
  public async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const { _id, ...obj } = result.ops[0]
    return Object.assign({}, obj, { id: _id })
  }
}
