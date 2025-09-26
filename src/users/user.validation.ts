import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import ApiError from '../utils/ApiError.js'
import { StatusCodes } from 'http-status-codes'

export const createNew = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object({
    username: Joi.string().min(8).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone_number: Joi.string().pattern(/^[0-9]+$/).optional(),
    avatar: Joi.string().uri().optional()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    let errorMessage = 'Unaccepted Input'

    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }

    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage))
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object({
    username: Joi.string().min(8).max(255).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    phone_number: Joi.string().pattern(/^[0-9]+$/).optional(),
    avatar: Joi.string().uri().optional()
  }).min(1)

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    let errorMessage = 'Unaccepted Input'

    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error == 'string') {
      errorMessage = error
    }

    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage))
  }
}

export const userValidation = {
  createNew,
  update
}
