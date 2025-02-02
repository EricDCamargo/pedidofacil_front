import { ProductProps } from './product.type'

export interface ItemProps {
  id: string
  amount: number
  created_at: string
  updated_at: string
  order_id: string
  product_id: string
  product: ProductProps
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
  payments: PaymentProps[]
}

interface PaymentProps {
  id: string
  order_id: string
  value: number
  payment_method: string
  created_at: string
  updated_at: string
}

enum OrderStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED'
}
