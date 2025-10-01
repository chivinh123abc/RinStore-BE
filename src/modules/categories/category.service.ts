import { StatusCodes } from 'http-status-codes'
import ApiError from '../../utils/ApiError.js'
import { slugify } from '../../utils/formatters.js'
import { CategoryCreateDto, CategoryResponseDto, CategoryUpdateDto } from '../types/categories.js'
import { categoryModel } from './category.model.js'

const createNew = async (reqBody: CategoryCreateDto): Promise<CategoryResponseDto> => {
  try {
    reqBody.category_slug = slugify(reqBody.category_name)

    const existCategory = await categoryModel.findCategoryBySlugName(reqBody.category_slug)

    if (existCategory) {
      throw new ApiError(StatusCodes.CONFLICT, 'This category already exist!')
    }

    const result = await categoryModel.create(reqBody)
    return result
  } catch (error) {
    throw error
  }

}

const getCategory = async (category_id: number): Promise<CategoryResponseDto | null> => {
  try {
    const existCategory = await categoryModel.findCategoryById(category_id)

    if (!existCategory) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'category not found')
    }

    const result = await categoryModel.findCategoryById(category_id)
    return result
  } catch (error) {
    throw error
  }
}

const updateCategory = async (category_id: number, reqBody: CategoryUpdateDto): Promise<CategoryResponseDto | null> => {
  try {
    const existCategory = await categoryModel.findCategoryById(category_id)

    if (!existCategory) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'category not found')
    }

    reqBody.category_slug = slugify(reqBody.category_name)

    const existCategory2 = await categoryModel.findCategoryBySlugName(reqBody.category_slug)

    if (existCategory2) {
      throw new ApiError(StatusCodes.CONFLICT, 'category name is duplicated')
    }

    const result = await categoryModel.update(category_id, reqBody)
    return result
  } catch (error) {
    throw error
  }
}

export const categoryService = {
  createNew,
  getCategory,
  updateCategory
}
