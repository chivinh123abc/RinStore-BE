import express from 'express'
import { categoryRoute } from '../modules/categories/category.route.js'
import { productItemRoute } from '../modules/product_items/product_item.route.js'
import { productRoute } from '../modules/products/product.route.js'
import { userRoute } from '../modules/users/user.route.js'

const Router = express.Router()

Router.use('/user', userRoute)

Router.use('/category', categoryRoute)

Router.use('/product', productRoute)

Router.use('/product_item', productItemRoute)

export const APIs = Router
