export interface LogProps {
  id: string
  user_id?: string
  route: string
  method: string
  details?: string
  created_at: string
  user?: User
}

interface User {
  id: string
  name: string
  email: string
}
