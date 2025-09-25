import express from 'express'
import { userRoute } from '../users/user.route.js';

const Router = express.Router()

Router.get("/user", userRoute);

export const APIs = Router
