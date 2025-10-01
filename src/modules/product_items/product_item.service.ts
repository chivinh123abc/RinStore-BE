import { StatusCodes } from 'http-status-codes'
import ApiError from '../../utils/ApiError.js'
import { productModel } from '../products/product.model.js'
import { ProductItemCreateDto, ProductItemResponseDto, ProductItemUpdateDto } from '../types/product_items.js'
import { productItemModel } from './product_item.model.js'

const createNew = async (reqBody: ProductItemCreateDto): Promise<ProductItemResponseDto> => {
  try {
    if (!reqBody.product_id) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'product_id must be exist')
    }
    const existProduct = await productModel.findProductById(reqBody.product_id)
    if (!existProduct) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'this product_id is not exist')
    }

    const createdProductItem = await productItemModel.create(reqBody)
    return createdProductItem
  } catch (error) {
    throw (error)
  }
}

const getProductItem = async (product_item_id: number): Promise<ProductItemResponseDto | null> => {
  try {
    const result = await productItemModel.findProductItemById(product_item_id)

    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'This product item is not exist')
    }

    return result
  } catch (error) {
    throw (error)
  }
}

const update = async (reqBody: ProductItemUpdateDto): Promise<ProductItemResponseDto | null> => {
  try {

    if (reqBody.product_id) {
      const existProduct = await productModel.findProductById(reqBody.product_id)
      if (!existProduct) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'This product is not exist')
      }
    }

    if (reqBody.sku) {
      const existProduct = await productItemModel.findProductItemBySKU(reqBody.sku)
      if (!existProduct) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'The product item with this sku is not exist')
      }
    }


    const existProductItem = await productItemModel.findProductItemById(reqBody.product_item_id)
    if (!existProductItem) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'This product item is not exist')
    }

    const result = await productItemModel.update(reqBody)

    return result
  } catch (error) {
    throw (error)
  }
}

export const productItemService = {
  createNew,
  getProductItem,
  update
}
