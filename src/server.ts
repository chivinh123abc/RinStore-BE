import express, { Request, Response } from "express"
import cors from 'cors'
import { APIs } from './routes/index.js'
import { env } from './configs/environment.js'
import { asyncExitHook } from 'exit-hook';
import { pool } from './configs/database.js';

const START_SERVER = () => {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use('/', APIs)

  //Xu li loi
  app.get("/", (req: Request, res: Response) => {
    res.json({ message: 'Hello from Express + TypeScript 🚀' })
  }
  )

  if (env.BUILD_MODE === 'dev') {
    app.listen(3000, () => {
      console.log(`Server running at http://localhost:3000`)
    })
  }



  asyncExitHook(async () => {
    console.log('[SERVER]: Server is shutting down');
    pool.end();
    console.log('')
  }, {
    wait: 300
  });
}


export const Server = {
  START_SERVER
}
