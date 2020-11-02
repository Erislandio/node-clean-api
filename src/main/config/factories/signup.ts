import { DbAddAccount } from '../../../data/useCases/addAccount/dbAddAccount'
import { SingUpController } from '../../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../../utils/emailValidatorAdpter'
import { BcryptAdpter } from '../../../infra/criptography/bycriptAdapter'
import { AccountMongoRepository } from '../../../infra/criptography/db/mongodb/accountRepository/account'

export const makeSignupController = (): SingUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdpter = new BcryptAdpter()
  const addAccountRepo = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdpter, addAccountRepo)

  const singUpController = new SingUpController(emailValidatorAdapter, addAccount)
  return singUpController
}
