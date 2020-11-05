import { DbAddAccount } from '../../../data/useCases/addAccount/dbAddAccount'
import { SingUpController } from '../../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../../utils/emailValidatorAdpter'
import { BcryptAdpter } from '../../../infra/criptography/bycriptAdapter'
import { AccountMongoRepository } from '../../../infra/criptography/db/mongodb/accountRepository/account'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'

export const makeSignupController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdpter = new BcryptAdpter()
  const addAccountRepo = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdpter, addAccountRepo)

  const singUpController = new SingUpController(emailValidatorAdapter, addAccount)
  return new LogControllerDecorator(singUpController)
}
