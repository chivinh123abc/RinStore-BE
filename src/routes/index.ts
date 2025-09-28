import express from 'express'
import { categoryRoute } from '../categories/category.route.js'
import { userRoute } from '../users/user.route.js'

const Router = express.Router()

Router.use('/user', userRoute)

Router.use('/category', categoryRoute)

export const APIs = Router
