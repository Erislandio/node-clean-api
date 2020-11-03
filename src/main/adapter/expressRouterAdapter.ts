import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../../presentation/protocols'

export const routerAdapter = (controller: Controller): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode)
    res.json(httpResponse.body)
  }
}
