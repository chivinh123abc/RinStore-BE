import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '../utils/ApiError.js'

export const createNew = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object({
    category_name: Joi.string().min(4).max(255).required()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    let errorMessage = 'Unaccepted input'

    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage))
  }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object({
    category_name: Joi.string().min(4).max(255).optional()
  }).min(1)
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    let errorMessage = 'Unaccepted input'

    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage))
  }
}

export const categoryValidation = {
  createNew,
  updateCategory
}
