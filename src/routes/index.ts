import express from 'express'
import { Request, Response } from 'express'
import { userRoute } from 'src/routes/userRoute'

const Router = express.Router()

Router.use('/users', userRoute)

export const APIs = Router
