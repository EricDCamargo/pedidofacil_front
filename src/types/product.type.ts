import { CategoryProps } from './category.type'

export interface ProductProps {
  id: string
  name: string
  price: number
  description: string
  banner: string
  created_at: string
  updated_at: string
  category_id: string
  category: CategoryProps
}
export interface NewProductProps {
  id?: string
  name: string
  price: number
  description: string
  banner: string
  created_at?: string
  updated_at?: string
  category_id: string
}
