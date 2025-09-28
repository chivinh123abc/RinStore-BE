import express from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware.js'
import { categoryController } from './category.controller.js'
import { categoryValidation } from './category.validation.js'

const Router = express.Router()

Router.route('/create').post(authMiddleware.isAuthorized, categoryValidation.createNew, categoryController.createNew)

Router.route('/:category_id')
  .get(authMiddleware.isAuthorized, categoryController.getCategory)
  .put(authMiddleware.isAuthorized, categoryController.updateCategory)


export const categoryRoute = Router
