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
export interface CurrentProductProps {
  id?: string
  name: string
  price: number
  description: string
  banner: string
  category_id: string
}

// extract only desired properties from ProductProps to CurrentProductProps
export const formatProduct = (product: ProductProps): CurrentProductProps => ({
  id: product.id,
  name: product.name,
  price: product.price,
  description: product.description,
  banner: product.banner,
  category_id: product.category_id
})
