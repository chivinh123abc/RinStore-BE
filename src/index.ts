import { Server } from './server.js'
import { pool } from './configs/database.js'

(async () => {
  try {
    const result = await pool.query('SELECT NOW()')
    Server.START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit()
  }
})()