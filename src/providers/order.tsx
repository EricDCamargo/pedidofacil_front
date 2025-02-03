'use client'

import { serviceConsumer } from '@/services/service.consumer'
import { OrderProps } from '@/types/order.type'
import { StatusCodes } from 'http-status-codes'
import { useRouter } from 'next/navigation'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
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
  setCurrentTable: Dispatch<SetStateAction<string>>
}

type OrderProviderProps = {
  children: ReactNode
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps) {
  const [currentTable, setCurrentTable] = useState<string>('')
  const [currentOrders, setCurrentOrders] = useState<OrderProps[]>([]) // all orders per table id
  const [selectedOrder, setSelectedOrder] = useState<OrderProps>() // selected order by current table
  const [isOrderModalOpen, setOrderModalOpen] = useState(false)

  async function handleDetailTableOrders() {
    //should fetch '/orders?table_id=id' to return the oders related to this table
    try {
      const res = await serviceConsumer('').executeGet('/orders', {
        table_id: currentTable
      })

      if (res.isOk && res.status === StatusCodes.OK) {
        setCurrentOrders(res.data)
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    } catch (err) {
      console.log(err)
      toast.error('Falha ao carregar os pedidos!')
      return
    }
  }
  useEffect(() => {
    if (currentTable) {
      handleDetailTableOrders()
    }
  }, [currentTable])
  return (
    <OrderContext.Provider
      value={{
        currentOrders,
        isOrderModalOpen,
        selectedOrder,
        setSelectedOrder,
        setOrderModalOpen,
        setCurrentOrders,
        setCurrentTable
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
