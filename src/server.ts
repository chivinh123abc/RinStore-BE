/* eslint-disable no-console */
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { asyncExitHook } from 'exit-hook'
import express from 'express'
import { pool } from './configs/database.js'
import { env } from './configs/environment.js'
import { setupSwagger } from './configs/swagger.js'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js'
import { APIs } from './routes/index.js'

const START_SERVER = () => {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.use(cookieParser())
  // dung swagger UI
  setupSwagger(app)

  app.use('/', APIs)
  //Xu li loi
  app.use(errorHandlingMiddleware)
  if (env.BUILD_MODE === 'dev') {
    app.listen(3000, () => {
      console.log('[SERVER] Server running at http://localhost:3000/')
      console.log('Swagger docs at http://localhost:3000/api-docs')
    })
  }
  // EXIT HOOK
  asyncExitHook(async () => {
    console.log('[SERVER]: Server is shutting down')
    pool.end()
    console.log('[DATABASE]: Database is shutting down')
  }, {
    wait: 300
  })
}


export const Server = {
  START_SERVER
}
