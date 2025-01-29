export interface UserProps {
  id: string
  name: string
  email: string
  role: UserRole
  password?: string
  created_at: string
  updated_at: string
}
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
export enum ErrorMessages {
  TOKEN_EXPIRED = 'token-expired',
  SERVICE_UNAVAILABLE = 'service-unavailable',
  UNAUTHORIZED = 'unauthorized'
}
