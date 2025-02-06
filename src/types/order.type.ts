import { ProductProps } from './product.type'

export type ProductWithoutCategory = Omit<ProductProps, 'category'>
export interface ItemProps {
  id: string
  amount: number
  unit_value: string
  total_value: string
  observation: string
  created_at: string
  updated_at: string
  order_id: string
  product_id: string
  product: ProductWithoutCategory
}

export interface OrderProps {
  id: string
  number: number
  table_id: string
  status: string
  name: string
  total: number
  created_at: string
  updated_at: string
  items: ItemProps[]
  paymentOrders: PaymentOrders[]
}

interface PaymentOrders {
  id: string
  payment_id: string
  order_id: string
  value: number
  created_at: string
  updated_at: string
  payment: Payment
}

interface Payment {
  id: string
  table_id: string
  value: number
  payment_method: string
  change: number
  created_at: string
  updated_at: string
}

enum OrderStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED'
}
