export interface ProductCreateDto {
  product_name: string,
  product_slug: string,
  category_id: number
}

export interface ProductUpdateDto {
  product_name?: string,
  product_slug?: string,
  category_id?: number
}

export interface ProductResponseDto {
  product_id?: number,
  product_name?: string,
  product_slug?: string,
  category_id?: number,
  created_at?: Date,
  updated_at?: Date
}
