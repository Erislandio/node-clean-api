import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../../presentation/protocols'

export const routerAdapter = (controller: Controller): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    const { body, statusCode } = await controller.handle(httpRequest)

    if (statusCode === 2000) {
      res.status(statusCode).json(body)
    } else {
      res.status(statusCode).json({
        error: body.message
      })
    }
  }
}
