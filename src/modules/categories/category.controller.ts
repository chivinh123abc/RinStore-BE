import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { categoryService } from './category.service.js'

const createNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCategory = await categoryService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(newCategory)
  } catch (error) {
    next(error)
  }
}

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category_id = Number(req.params?.category_id)

    const thisCategory = await categoryService.getCategory(category_id)
    res.status(StatusCodes.ACCEPTED).json(thisCategory)
  } catch (error) {
    next(error)
  }
}
const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category_id = Number(req.params?.category_id)
    const updatedCategory = await categoryService.updateCategory(category_id, req.body)
    res.status(StatusCodes.ACCEPTED).json(updatedCategory)
  } catch (error) {
    next(error)
  }
}

export const categoryController = {
  createNew,
  getCategory,
  updateCategory
}
