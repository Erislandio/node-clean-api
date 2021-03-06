import { ServerError } from '../errors/serverError'
import { HttpResponse } from '../protocols/http.interface'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const success = (body: any): HttpResponse => ({
  body,
  statusCode: 200
})
