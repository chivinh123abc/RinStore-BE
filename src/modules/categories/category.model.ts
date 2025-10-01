import { pool } from '../../configs/database.js'
import { CategoryCreateDto, CategoryResponseDto, CategoryUpdateDto } from '../types/categories.js'

const create = async (reqBody: CategoryCreateDto): Promise<CategoryResponseDto> => {
  const result = await pool.query(
    `
      INSERT INTO categories (category_name, category_slug)
      VALUES ($1, $2)
      RETURNING category_id, category_name, category_slug, created_at, updated_at
    `,
    [reqBody.category_name, reqBody.category_slug]
  )

  return result.rows[0]
}

const findCategoryById = async (category_id: number): Promise<CategoryResponseDto | null> => {
  const result = await pool.query(
    `
    SELECT *
    FROM categories
    WHERE category_id = $1
    `,
    [category_id]
  )
  return result.rows.length > 0 ? result.rows[0] : null
}

const findCategoryBySlugName = async (category_slug: string): Promise<CategoryResponseDto | null> => {
  const result = await pool.query(
    `
    SELECT *
    FROM categories
    WHERE category_slug = $1
    `,
    [category_slug]
  )
  return result.rows.length > 0 ? result.rows[0] : null
}

const update = async (category_id: number, reqBody: CategoryUpdateDto): Promise<CategoryResponseDto | null> => {
  const updatedEntries = Object.entries(reqBody).filter(([_, value]) => value !== undefined)

  if (updatedEntries.length === 0) {
    return null
  }

  const fields = updatedEntries.map(([key, _], index) => `${key} = $${index + 1}`)
  const values = updatedEntries.map(([_, value]) => value)

  fields.push('updated_at = NOW()')
  values.push(category_id)

  const queryData = `
    UPDATE categories
    SET ${fields.join(', ')}
    WHERE category_id = $${updatedEntries.length + 1}
    RETURNING category_id, category_name, category_slug, created_at, updated_at
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
