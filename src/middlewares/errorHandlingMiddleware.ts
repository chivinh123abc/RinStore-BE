import { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { env } from '../configs/environment.js'
import ApiError from '../configs/utils/ApiError.js'


export const errorHandlingMiddleware = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  if (!err.statusCode) {
    err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack
  }

  if (env.BUILD_MODE !== 'dev') {
    delete responseError.stack
  }

  res.status(responseError.statusCode).json(responseError)

}
