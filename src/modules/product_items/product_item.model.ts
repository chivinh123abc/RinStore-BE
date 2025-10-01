import { keyBy } from 'lodash'
import { pool } from '../../configs/database.js'
import { ProductItemCreateDto, ProductItemResponseDto, ProductItemUpdateDto } from '../types/product_items.js'

const create = async (reqBody: ProductItemCreateDto): Promise<ProductItemResponseDto> => {
  const result = await pool.query(`
    INSERT INTO product_items (product_id, stock_quantity, product_item_price)
    VALUES ($1, $2, $3)
    RETURNING *
    `
    , [reqBody.product_id, reqBody.stock_quantity, reqBody.product_item_price]
  )
  return result.rows[0]
}

const findProductItemById = async (product_item_id: number): Promise<ProductItemResponseDto | null> => {
  const result = await pool.query(`
    SELECT *
    FROM product_items
    WHERE product_item_id = $1 
    `,
    [product_item_id]
  )
  return result.rows[0] || null
}

const findProductItemBySKU = async (sku: string): Promise<ProductItemResponseDto | null> => {
  const result = await pool.query(`
    SELECT *
    FROM product_items
    WHERE sku = $1 
    `,
    [sku]
  )
  return result.rows[0] || null
}

const update = async (reqBody: ProductItemUpdateDto): Promise<ProductItemResponseDto | null> => {

  const updatedEntries = Object.entries(reqBody).filter(([key, v]) => v !== undefined && key !== 'product_item_id')

  if (updatedEntries.length === 0) {
    return null
  }

  const fields = updatedEntries.map(([key, _], index) => `${key} = $${index + 1}`)

  const values = updatedEntries.map(([_, value]) => value)


  fields.push('updated_at = NOW()')

  const queryData = `
    UPDATE product_items
    SET ${fields.join(', ')}
    WHERE product_item_id = ${reqBody.product_item_id}
    RETURNING *
    `

  const result = await pool.query(queryData, values)

  return result.rows.length > 0 ? result.rows[0] : null

}

export const productItemModel = {
  create,
  findProductItemById,
  update,
  findProductItemBySKU
}
