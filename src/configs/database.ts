import { env } from 'src/configs/environment'
import { Pool } from 'pg'

export const pool = new Pool({
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME
}
)

pool.on("connect", () => {
  console.log('Connect to PostgreSQl')
})