import { pool } from '../../configs/database.js'
import { product } from '../types/products.js'

const create = async (reqBody: product) => {

  const createEntries = Object.entries(reqBody).filter(([_, v]) => v !== undefined)

  const field_keys = createEntries.map(([key]) => `${key}`)
  const field_values = createEntries.map(([_], index) => `$${index + 1}`)
  const values = createEntries.map(([_, value]) => value)

  const createData = `
    INSERT INTO products (${field_keys.join(', ')})
    VALUES (${field_values.join(', ')})
    RETURNING product_id, ${field_keys.join(', ')}, created_at, updated_at
  `

  const createdProduct = await pool.query(createData, values)
  return createdProduct.rows[0]
}

const findProductById = async (product_id: number) => {
  const result = await pool.query(`
    SELECT product_id, product_name, product_slug, category_id, created_at, updated_at
    FROM products
    WHERE product_id = $1
    `,
    [product_id]
  )
  return await result.rows[0]
}

const findProductBySlug = async (product_slug: string) => {
  const result = await pool.query(`
      SELECT product_id, product_name, product_slug, category_id, created_at, updated_at
      FROM products
      WHERE product_slug = $1
    `,
    [product_slug]
  )
  return await result.rows[0]
}

const update = async (product_id: number, reqBody: product) => {
  const updatedEntries = Object.entries(reqBody).filter(([_, value]) => value !== undefined)

  const fields = updatedEntries.map(([key], index) => `${key} = $${index + 1}`)
  const value = updatedEntries.map(([_, value]) => value)

  fields.push('updated_at = NOW()')
  value.push(product_id)

  const queryData = `
    UPDATE products
    SET ${fields.join(', ')}
    WHERE product_id = $${updatedEntries.length + 1}
    RETURNING product_id, product_name, product_slug, category_id, created_at, updated_at
  `
  const updatedProduct = await pool.query(queryData, value)
  return updatedProduct.rows[0]
}

export const productModel = {
  create,
  findProductById,
  findProductBySlug,
  update
}
