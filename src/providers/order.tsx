'use client'

import { serviceConsumer } from '@/services/service.consumer'
import { OrderProps } from '@/types/order.type'
import { StatusCodes } from 'http-status-codes'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from 'react'
import { toast } from 'sonner'

type OrderContextData = {
  currentOrders: OrderProps[]
  isOrderModalOpen: boolean
  selectedOrder: OrderProps | undefined
  setSelectedOrder: Dispatch<SetStateAction<OrderProps | undefined>>
  setOrderModalOpen: Dispatch<SetStateAction<boolean>>
  setCurrentOrders: Dispatch<SetStateAction<OrderProps[]>>
}

type OrderProviderProps = {
  children: ReactNode
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps) {
  const [currentOrders, setCurrentOrders] = useState<OrderProps[]>([]) // all orders per table id
  const [selectedOrder, setSelectedOrder] = useState<OrderProps>() // selected order by current table
  const [isOrderModalOpen, setOrderModalOpen] = useState(false)

  return (
    <OrderContext.Provider
      value={{
        currentOrders,
        isOrderModalOpen,
        selectedOrder,
        setSelectedOrder,
        setOrderModalOpen,
        setCurrentOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
