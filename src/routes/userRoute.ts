import express from 'express'
import { userController } from 'src/controllers/userController'

const Router = express.Router()

Router.route('/register').post(userController.createNew)
Router.route('/get/:user_id').get(userController.getUser)

export const userRoute = Router
