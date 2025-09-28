import express from 'express'
import { productItemController } from './product_item.controller.js'
import { productItemValidation } from './product_item.validation.js'

const Router = express.Router()

Router.route('/create').post(productItemValidation.createNew, productItemController.createNew)

Router.route('/:product_item_id')
  .get(productItemController.getProductItem)

export const productItemRoute = Router
