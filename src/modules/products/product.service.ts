import { StatusCodes } from 'http-status-codes'
import ApiError from '../../utils/ApiError.js'
import { slugify } from '../../utils/formatters.js'
import { categoryModel } from '../categories/category.model.js'
import { product } from '../types/products.js'
import { productModel } from './product.model.js'

const createNew = async (reqBody: product) => {
  try {
    if (!reqBody.product_name) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'product_name not to be undefined!')
    }
    if (!reqBody.category_id) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'category_id not to be undefined!')
    }

    reqBody.product_slug = slugify(reqBody.product_name)

    const existProduct = await productModel.findProductBySlug(reqBody.product_slug)
    if (existProduct) {
      throw new ApiError(StatusCodes.CONFLICT, 'This product already exist')
    }

    const existCategory = await categoryModel.findCategoryById(reqBody.category_id)
    if (!existCategory) {
      throw new ApiError(StatusCodes.CONFLICT, 'This category is not exist')
    }

    const result = await productModel.create(reqBody)
    return result
  } catch (error) {
    throw error
  }
}

const getProduct = async (product_id: number) => {
  try {
    const result = await productModel.findProductById(product_id)

    if (!result) {
      throw new ApiError(StatusCodes.CONFLICT, 'This product is not exist')
    }

    return result
  } catch (error) {
    throw error
  }
}

const update = async (product_id: number, reqBody: product) => {
  try {
    const existProduct = await productModel.findProductById(product_id)
    if (!existProduct) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'product_id is not exist')
    }

    if (!reqBody.product_name) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'product_name not to be undefined!')
    }
    reqBody.product_slug = slugify(reqBody.product_name)

    const existProduct2 = await productModel.findProductBySlug(reqBody.product_slug)
    if (existProduct2) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'This name already exist')
    }

    const updatedProduct = await productModel.update(product_id, reqBody)
    return updatedProduct
  } catch (error) {
    throw error
  }
}

export const productService = {
  createNew,
  getProduct,
  update
}
