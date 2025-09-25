import { pool } from '../configs/database.js'

export interface user {
  user_id: number,
  user_name: string,
  user_email: string
}

interface userNoId_noStrict {
  user_name?: string,
  user_email?: string
}

interface userNoId {
  user_name: string,
  user_email: string
}

const create = async (user_name: string, user_email: string): Promise<user> => {
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

const update = async (user_id: number, updatedData: userNoId_noStrict): Promise<user | null> => {
  const fields: string[] = []
  const values: any[] = []
  let index = 1

  if (updatedData.user_name !== undefined) {
    fields.push(`user_name = $${index++}`)
    values.push(updatedData.user_name)
  }

  if (updatedData.user_email !== undefined) {
    fields.push(`user_email = $${index++}`)
    values.push(updatedData.user_email)
  }

  if (fields.length === 0) {
    return null
  }

  values.push(user_id)

  const query = `
  UPDATE users
  SET ${fields.join(', ')}
  WHERE user_id = $${index}
  RETURNING user_id, user_name, user_email
  `

  const result = await pool.query(query, values)

  return result.rows[0] || null
}

export const userModel = {
  create,
  findUserId,
  update
}
