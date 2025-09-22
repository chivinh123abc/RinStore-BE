import { pool } from 'src/configs/database'

interface createUser {
  user_name: string,
  user_email: string
}

interface user {
  user_id: number,
  user_name: string,
  user_email: string
}

const create = async ({ user_name, user_email }: createUser): Promise<user> => {
  const result = await pool.query(
    `
      INSERT INTO users (user_name, user_email)
      VALUES ($1, $2)
      RETURNING user_id, user_name, user_email
    `,
    [user_name, user_email]
  )
  return result.rows[0]
}

const findUserId = async (user_id: number): Promise<user | null> => {
  const result = await pool.query(
    `
      SELECT user_id, user_name, user_email
      FROM users
      WHERE user_id = $1
    `,
    [user_id]
  )
  return result.rows[0] || null
}

export const userModel = {
  create,
  findUserId
}
