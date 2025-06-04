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
  handleCloseBill: (table_id: string) => Promise<void>
  handlePrintOrderToCkitchen: (order_id: string) => Promise<void>
  fetchTableOrders: (table_id?: string) => Promise<OrderProps[] | []>
}

type OrderProviderProps = {
  children: ReactNode
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrderProps>() // selected order by current table
  const [isOrderModalOpen, setOrderModalOpen] = useState(false)
  const router = useRouter()

  const fetchTableOrders = async (
    table_id?: string
  ): Promise<OrderProps[] | []> => {
    try {
      const response = await serviceConsumer().executeGet('/orders', {
        table_id
      })
      return response.data || []
    } catch (err) {
      console.log(err)
      return []
    }
  }

  const handleCloseBill = async (table_id: string) => {
    try {
      const token = await getCookieServer()
      const res = await serviceConsumer(token).executePut('/table/close', {
        table_id
      })
      if (res.isOk && res.status === StatusCodes.OK) {
        toast.success(res.message)
        router.push('/dashboard')
      } else {
        toast.error(res.message)
        return
      }
    } catch (error) {
      console.error('Error closing bill:', error)
      return
    }
  }

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
  const handlePrintOrderToCkitchen = async (order_id: string) => {
    try {
      const token = await getCookieServer()
      const res = await serviceConsumer(token).executePost(
        '/printer/order',
        {},
        {
          order_id
        }
      )
      if (res.isOk && res.status === StatusCodes.OK) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
        return
      }
    } catch (error) {
      console.error('Error printing order:', error)
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
        handleDeleteOrder,
        handleCloseBill,
        handlePrintOrderToCkitchen,
        fetchTableOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
