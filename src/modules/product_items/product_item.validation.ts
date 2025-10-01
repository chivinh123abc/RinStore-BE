import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '../../utils/ApiError.js'

const createNew = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object({
    product_id: Joi.number().min(1).required(),
    sku: Joi.string().min(4).max(255).optional(),
    stock_quantity: Joi.number().integer().min(0).required(),
    product_item_image: Joi.string().uri().optional(),
    product_item_price: Joi.number().min(0).required()
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

const update = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object({
    product_id: Joi.number().min(1).optional(),
    sku: Joi.string().min(4).max(255).optional(),
    stock_quantity: Joi.number().integer().min(0).optional(),
    product_item_image: Joi.string().uri().optional(),
    product_item_price: Joi.number().min(0).optional()
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

export const productItemValidation = {
  createNew
}
