export interface CategoryResponseDto {
  category_id?: number
  category_name?: string
  category_slug?: string
  created_at?: Date
  updated_at?: Date
}

export interface CategoryCreateDto {
  category_name: string
  category_slug: string
}

export interface CategoryUpdateDto {
  category_name: string
  category_slug: string
}
