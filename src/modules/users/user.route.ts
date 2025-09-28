import express from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware.js'
import { userController } from './user.controller.js'
import { userValidation } from './user.validation.js'

const Router = express.Router()

Router.route('/register').post(userValidation.createNew, userController.createNew)

Router.route('/info').get(authMiddleware.isAuthorized, userController.getUser)

Router.route('/delete').delete(authMiddleware.isAuthorized, userController.softDelete)

Router.route('/update').put(authMiddleware.isAuthorized, userValidation.update, userController.update)

Router.route('/verify').put(userValidation.verifyAccount, userController.verifyAccount)

Router.route('/login').post(userValidation.login, userController.login)

Router.route('/logout').delete(userController.logout)

Router.route('/refresh_token').get(userController.refreshToken)

export const userRoute = Router
