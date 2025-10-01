export interface ProductItemCreateDto {
  product_item_id?: number,
  product_id: number,
  stock_quantity: number,
  product_item_price: number
  sku?: string,
  product_item_image?: string,
}

export interface ProductItemUpdateDto {
  product_item_id: number,
  product_id?: number,
  stock_quantity?: number,
  product_item_price?: number
  sku?: string,
  product_item_image?: string,
}

export interface ProductItemResponseDto {
  product_item_id?: number,
  product_id?: number,
  sku?: string,
  stock_quantity?: number,
  product_item_image?: string,
  product_item_price?: number
}
