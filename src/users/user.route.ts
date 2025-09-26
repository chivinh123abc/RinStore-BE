import express from 'express'
import { userController } from './user.controller.js'
import { userValidation } from './user.validation.js'

const Router = express.Router()

Router.route('/register').post(userValidation.createNew, userController.createNew)
Router.route('/:user_id')
  .get(userController.getUser)
  .put(userValidation.update, userController.update)
  .delete(userController.softDelete)
Router.route('/login')
  .post(userController.login)

export const userRoute = Router
