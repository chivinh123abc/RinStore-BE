import { pool } from '../configs/database.js'
import { category } from '../types/categories.js'

const create = async (reqBody: category) => {
  const result = await pool.query(
    `
      INSERT INTO categories (category_name, category_slug)
      VALUES ($1, $2)
      RETURNING category_id, category_name, category_slug
    `,
    [reqBody.category_name, reqBody.category_slug]
  )

  return result.rows[0]
}

const findCategoryById = async (category_id: number) => {
  const result = await pool.query(
    `
    SELECT *
    FROM categories
    WHERE category_id = $1
    `,
    [category_id]
  )
  return result.rows[0]
}

const findCategoryBySlugName = async (category_slug: string) => {
  const result = await pool.query(
    `
    SELECT *
    FROM categories
    WHERE category_slug = $1
    `,
    [category_slug]
  )
  return result.rows[0]
}

const update = async (category_id: number, reqBody: category) => {
  const updatedEntries = Object.entries(reqBody).filter(([_, value]) => value !== undefined)

  if (updatedEntries.length === 0) {
    return null
  }

  const fields = updatedEntries.map(([key, _], index) => `${key} = $${index + 1}`)
  const values = updatedEntries.map(([_, value]) => value)

  values.push(category_id)
  const queryData = `
    UPDATE categories
    SET ${fields.join(', ')}
    WHERE category_id = $${updatedEntries.length + 1}
    RETURNING category_id, category_name, category_slug
  `

  const result = await pool.query(queryData, values)
  return result.rows[0]
}

export const categoryModel = {
  create,
  findCategoryById,
  findCategoryBySlugName,
  update
}
