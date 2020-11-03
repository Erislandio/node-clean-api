
import { Router } from 'express'
import { routerAdapter } from '../adapter/expressRouterAdapter'
import { makeSignupController } from '../config/factories/signup'

export default (router: Router): void => {
  router.post('/signup', routerAdapter(makeSignupController()))
}
