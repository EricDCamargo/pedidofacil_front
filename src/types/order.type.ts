import { TableProps } from '@/providers/order'

export interface ItemProps {
  id: string
  amount: number
  created_at: string
  updated_at: string
  order_id: string
  product_id: string
  product: {
    id: string
    name: string
    price: number
    description: string
    banner: string
    created_at: string
    updated_at: string
    category_id: string
  }
}

export interface OrderProps {
  id: string
  table_id: string
  status: string
  name: string
  total: number | null
  created_at: string
  updated_at: string
  items: ItemProps[]
  table: TableProps
  payments: any[]
}

enum OrderStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED'
}
