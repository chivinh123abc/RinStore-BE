import { pool } from '../../configs/database.js'
import { user } from '../types/user.js'

// CREATE da xong
const create = async (reqBody: user) => {
  const result = await pool.query(
    `
      INSERT INTO users (username, email, password, phone_number, avatar, verify_token)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING user_id, username, email, phone_number, avatar, created_at
    `,
    [reqBody.username, reqBody.email, reqBody.password, reqBody.phone_number, reqBody.avatar, reqBody.verify_token]
  )
  return result.rows[0]
}

//Ham nay ok
const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    `
    SELECT user_id, username, password, email, phone_number, avatar, created_at, updated_at, is_destroy, is_active, verify_token
    FROM users
    WHERE email = $1 AND is_destroy = false
    `, [email]
  )
  return result.rows[0] || null
}

//Ham nay ok not
const findUserById = async (user_id: number) => {
  const result = await pool.query(
    `
      SELECT user_id, username, password, email, phone_number, avatar, created_at, updated_at, is_destroy, is_active, verify_token
      FROM users
      WHERE user_id = $1 AND is_destroy = false
    `,
    [user_id]
  )
  return result.rows[0] || null
}

const update = async (user_id: number, reqBody: user) => {
  const updatedEntries = Object.entries(reqBody).filter(([_, v]) => v !== undefined)

  if (updatedEntries.length === 0) {
    return null
  }
  const fields = updatedEntries.map(([key], index) => `${key} = $${index + 1}`)
  const values = updatedEntries.map(([_, value]) => value)

  fields.push('updated_at = NOW()')

  values.push(user_id)

  const queryData = `
    UPDATE users
    SET ${fields.join(', ')}
    WHERE user_id = $${updatedEntries.length + 1}
    RETURNING user_id, username, email, phone_number, avatar, created_at, updated_at, is_destroy, is_active, verify_token
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
