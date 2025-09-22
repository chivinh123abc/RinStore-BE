import express, { Request, Response } from 'express'
import cors from 'cors'
import { env } from 'src/configs/environment'
import { APIs } from './routes'
import { pool } from './configs/database'


const START_SERVER = () => {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.use('/', APIs)

  // xu ly loi tap trung
  app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello from Express + TypeScript 🚀' })
  })

  if (env.BUILD_MODE === 'dev') {
    app.listen(3000, () => {
      console.log(`Server running at http://localhost:3000`)
    })
  }
}

(async () => {
  try {
    const result = await pool.query('SELECT NOW()')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
