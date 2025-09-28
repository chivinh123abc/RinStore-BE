import { StatusCodes } from 'http-status-codes'
import ApiError from '../../utils/ApiError.js'
import { productModel } from '../products/product.model.js'
import { product_item } from '../types/product_items.js'
import { productItemModule } from './product_item.model.js'

const createNew = async (reqBody: product_item) => {
  try {
    if (!reqBody.product_id) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'product_id must be exist')
    }
    const existProduct = await productModel.findProductById(reqBody.product_id)
    if (!existProduct) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'this product_id is not exist')
    }

    const createdProductItem = await productItemModule.create(reqBody)
    return createdProductItem
  } catch (error) {
    throw (error)
  }
}

const getProductItem = async (product_item_id: number) => {
  try {
    const result = await productItemModule.findProductItemById(product_item_id)
    return result
  } catch (error) {
    throw (error)
  }
}

export const productItemService = {
  createNew,
  getProductItem
}
