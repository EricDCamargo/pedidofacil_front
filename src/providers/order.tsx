'use client'

import { OrderProps } from '@/types/order.type'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from 'react'

type OrderContextData = {
  isOrderModalOpen: boolean
  selectedOrder: OrderProps | undefined
  setSelectedOrder: Dispatch<SetStateAction<OrderProps | undefined>>
  setOrderModalOpen: Dispatch<SetStateAction<boolean>>
}

type OrderProviderProps = {
  children: ReactNode
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrderProps>() // selected order by current table
  const [isOrderModalOpen, setOrderModalOpen] = useState(false)

  return (
    <OrderContext.Provider
      value={{
        isOrderModalOpen,
        selectedOrder,
        setSelectedOrder,
        setOrderModalOpen
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
