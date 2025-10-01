export interface UserRegisterDto {
  username: string
  email: string
  password: string
  phone_number?: string
  avatar?: string
  verify_token?: string
  is_active?: string
}

export interface UserVerifyAccountDTO {
  email: string
  verify_token: string
}

export interface UserLoginDto {
  email: string,
  password: string
}

export interface UserUpdateDto {
  username?: string,
  email?: string,
  password?: string,
  phone_number?: string,
  avatar?: string,
  verify_token?: string | null,
  is_active?: boolean
}

export interface UserResponseDto {
  user_id?: number
  username?: string
  email?: string
  phone_number?: string
  avatar?: string
  is_active?: boolean
  created_at?: Date
  updated_at?: Date,
  is_destroy?: boolean,
}

export interface AuthResponseDto extends UserResponseDto {
  access_token: string
  refresh_token: string
}

export interface UserEntity {
  user_id?: number
  username?: string
  email?: string
  password?: string
  phone_number?: string
  avatar?: string
  created_at?: Date
  updated_at?: Date | null
  is_destroy?: boolean
  is_active?: boolean
  verify_token?: string
  access_token?: string,
  refresh_token?: string
}

