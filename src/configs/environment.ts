import 'dotenv/config'
import { StringValue } from 'ms'

export const env = {
  BUILD_MODE: process.env.BUILD_MODE,
  //DB
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,

  ACCESS_TOKEN_SECRET_SIGNATURE: process.env.ACCESS_TOKEN_SECRET_SIGNATURE as string,
  ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE as StringValue | number,
  REFRESH_TOKEN_SECRET_SIGNATURE: process.env.REFRESH_TOKEN_SECRET_SIGNATURE as string,
  REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE as StringValue | number
}
