export interface user {
  user_id?: number,
  username?: string,
  email?: string,
  password?: string,
  phone_number?: string,
  avatar?: string,
  is_active?: boolean
  verify_token?: string | null
}
