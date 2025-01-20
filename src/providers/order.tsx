'use client'
import { createContext, ReactNode, useState } from 'react'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export interface ProductProps {
  id: string
  name: string
  price: number
  description: string
  banner: string
  created_at: string
  updated_at: string
  category_id: string
}

export interface OrderItemProps {
  id: string
  amount: number
  created_at: string
  updated_at: string
  order_id: string
  product_id: string
  product: ProductProps
}

export interface TableProps {
  id: string
  number: number
  status: string
  created_at: string
  updated_at: string
}

export interface PaymentProps {
  id: string
  order_id: string
  amount: number
  payment_method: string
  created_at: string
  updated_at: string
}

export interface OrderProps {
  id: string
  table_id: string
  status: string
  name: string
  total: number | null
  created_at: string
  updated_at: string
  items: OrderItemProps[]
  table: TableProps
  payments: PaymentProps[]
}
const emptyOrder: OrderProps = {
  id: '',
  table_id: '',
  status: '',
  name: '',
  total: null,
  created_at: '',
  updated_at: '',
  items: [],
  table: {
    id: '',
    number: 0,
    status: '',
    created_at: '',
    updated_at: ''
  },
  payments: []
}

type OrderContextData = {
  isOpen: boolean
  onRequestOpen: (order_id: string) => Promise<void>
  onRequestClose: () => void
  order: OrderProps
  finishOrder: (order_id: string) => Promise<void>
}

type OrderProviderProps = {
  children: ReactNode
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState<OrderProps>(emptyOrder)
  const router = useRouter()

  async function onRequestOpen(order_id: string) {
    // console.log(order_id);

    const token = getCookieClient()

    const response = await api.get('/order/detail', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        order_id: order_id
      }
    })

    setOrder(response.data)
    setIsOpen(true)
  }

  function onRequestClose() {
    setIsOpen(false)
  }

  async function finishOrder(order_id: string) {
    const token = getCookieClient()

    const data = {
      order_id: order_id
    }

    try {
      await api.put('/order/finish', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (err) {
      console.log(err)
      toast.error('Falha ao finalizar este pedido!')
      return
    }

    toast.success('Pedido finalizado com sucesso!')
    router.refresh()
    setIsOpen(false)
  }

  return (
    <OrderContext.Provider
      value={{
        isOpen,
        onRequestOpen,
        onRequestClose,
        finishOrder,
        order
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
