export interface Address {
  id: number
  latitude: string
  longitude: string
  receiver_address: string
  receiver_first_name: string
  receiver_last_name: string
  receiver_national_code: string
  receiver_phone: string
  receiver_post_code: string
  user: number
}

export interface User {
  id: number;
  username: string
  first_name: string
  last_name: string
  email: string
  is_staff: boolean
  is_active: boolean
  date_joined: string
}