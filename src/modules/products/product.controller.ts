import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { productService } from './product.service.js'

const createNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdProduct = await productService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdProduct)
  } catch (error) {
    next(error)
  }
}

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product_id = Number(req?.params?.product_id)

    const gotProduct = await productService.getProduct(product_id)
    res.status(StatusCodes.ACCEPTED).json(gotProduct)
  } catch (error) {
    next(error)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product_id = Number(req?.params?.product_id)
    const updatedProduct = await productService.update(product_id, req.body)
    res.status(StatusCodes.ACCEPTED).json(updatedProduct)
  } catch (error) {
    next(error)
  }
}

export const productController = {
  createNew,
  getProduct,
  update
}
