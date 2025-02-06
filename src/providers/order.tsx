'use client'

import { getCookieServer } from '@/lib/cookieServer'
import { serviceConsumer } from '@/services/service.consumer'
import { OrderProps } from '@/types/order.type'
import { StatusCodes } from 'http-status-codes'
import { useRouter } from 'next/navigation'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from 'react'
import { toast } from 'sonner'

type OrderContextData = {
  isOrderModalOpen: boolean
  selectedOrder: OrderProps | undefined
  setSelectedOrder: Dispatch<SetStateAction<OrderProps | undefined>>
  setOrderModalOpen: Dispatch<SetStateAction<boolean>>
  handleDeleteOrder: (order: OrderProps) => Promise<void>
}

type OrderProviderProps = {
  children: ReactNode
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrderProps>() // selected order by current table
  const [isOrderModalOpen, setOrderModalOpen] = useState(false)
  const router = useRouter()

  const handleDeleteOrder = async (order: OrderProps) => {
    try {
      const token = await getCookieServer()

      const res = await serviceConsumer(token).executeDelete('/order', {
        order_id: order.id
      })
      if (res.isOk && res.status === StatusCodes.OK) {
        toast.success(res.message)
        router.refresh()
      } else {
        toast.error(res.message)
        return
      }
    } catch (error) {
      console.error('Error deleting order:', error)
      return
    }
  }

  return (
    <OrderContext.Provider
      value={{
        isOrderModalOpen,
        selectedOrder,
        setSelectedOrder,
        setOrderModalOpen,
        handleDeleteOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
