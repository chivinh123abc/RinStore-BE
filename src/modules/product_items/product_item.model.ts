import { pool } from '../../configs/database.js'
import { product_item } from '../types/product_items.js'

const create = async (reqBody: product_item) => {
  const result = await pool.query(`
    INSERT INTO product_items (product_id, stock_quantity, product_item_price)
    VALUES ($1, $2, $3)
    RETURNING *
    `
    , [reqBody.product_id, reqBody.stock_quantity, reqBody.product_item_price]
  )
  return result.rows[0]
}

const findProductItemById = async (product_item_id: number) => {
  const result = await pool.query(`
    SELECT *
    FROM product_items
    WHERE product_item_id = $1 
    `,
    [product_item_id]
  )
  return result.rows[0]
}

export const productItemModule = {
  create,
  findProductItemById
}
