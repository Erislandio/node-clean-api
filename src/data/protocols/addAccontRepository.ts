import { AccountModel } from '../../domain/models/account'
import { AddAccountModel } from '../../domain/useCases/addAccount'

export interface AddAccountRespository {
  add: (account: AddAccountModel) => Promise<AccountModel>

}
