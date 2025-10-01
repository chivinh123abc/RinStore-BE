import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { productItemService } from './product_item.service.js'

const createNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdProductItem = await productItemService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdProductItem)
  } catch (error) {
    next(error)
  }
}

const getProductItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product_item_id = Number(req.params.product_item_id)

    const gotProductItem = await productItemService.getProductItem(product_item_id)
    res.status(StatusCodes.CREATED).json(gotProductItem)
  } catch (error) {
    next(error)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product_item_id = Number(req.params.product_item_id)
    const updateData = {
      product_item_id: product_item_id,
      ...req.body
    }

    const gotProductItem = await productItemService.update(updateData)
    res.status(StatusCodes.CREATED).json(gotProductItem)
  } catch (error) {
    next(error)
  }
}

export const productItemController = {
  createNew,
  getProductItem,
  update
}
