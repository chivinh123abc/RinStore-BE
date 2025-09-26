import { pool } from '../configs/database.js'

export interface userNoId {
  username?: string,
  email?: string
  password?: string,
  phone_number?: string,
  avatar?: string,
  is_active?: boolean,
  verifyToken?: string
}

export interface user {
  user_id: number,
  username: string,
  email: string,
  password: string,
  phone_number?: string,
  avatar?: string,
  is_active?: boolean
  verifyToken?: string
}

// CREATE da xong
const create = async ({ username, email, password, phone_number, avatar, verifyToken }: userNoId): Promise<user> => {
  const result = await pool.query(
    `
      INSERT INTO users (username, email, password, phone_number, avatar, verifyToken)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING user_id, username, email, phone_number, avatar, created_at
    `,
    [username, email, password, phone_number, avatar, verifyToken]
  )
  return result.rows[0]
}

//Ham nay ok
const findUserByEmail = async (email: string): Promise<user | null> => {
  const result = await pool.query(
    `
    SELECT user_id, username, password, email, phone_number, avatar, created_at, updated_at, is_destroy, is_active, verifyToken
    FROM users
    WHERE email = $1 AND is_destroy = false
    `, [email]
  )
  return result.rows[0] || null
}

//Ham nay ok not
const findUserById = async (user_id: number): Promise<user | null> => {
  const result = await pool.query(
    `
      SELECT user_id, username, password, email, phone_number, avatar, created_at, updated_at, is_destroy, is_active, verifyToken
      FROM users
      WHERE user_id = $1 AND is_destroy = false
    `,
    [user_id]
  )
  return result.rows[0] || null
}

const update = async (user_id: number, reqBody: userNoId): Promise<user | null> => {
  const updatedEntries = Object.entries(reqBody).filter(([_, v]) => v !== undefined)

  if (updatedEntries.length === 0) {
    return null
  }

  const fields = updatedEntries.map(([key], index) => `${key} = $${index + 1}`)
  const values = updatedEntries.map(([_, value]) => value)

  fields.push(`updated_at = NOW()`)

  values.push(user_id)

  const queryData = `
    UPDATE users
    SET ${fields.join(', ')}
    WHERE user_id = $${updatedEntries.length + 1}
    RETURNING user_id, username, email, phone_number, avatar, created_at, updated_at, is_destroy, is_active, verifyToken
    `
  const result = await pool.query(queryData, values)
  return result.rows[0] || null
}

const softDelete = async (user_id: number) => {
  const result = await pool.query(
    `
    UPDATE users
    SET is_destroy = $1
    WHERE user_id = $2
    RETURNING user_id, is_destroy
    `, [true, user_id]
  )

  return result.rows[0] || false
}

export const userModel = {
  create,
  findUserById,
  findUserByEmail,
  update,
  softDelete
}
