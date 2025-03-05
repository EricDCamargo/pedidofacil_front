'use client'

import styles from './styles.module.css'
import { useContext, useEffect, useState } from 'react'
import { OrderContext } from '@/contexts/order'
import { ArrowBigLeft, Eye, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import OrderModal from '../../../_components/modalOrder'
import DataTable from '../../../_components/dataTable/dataTable'
import { OrderProps } from '@/types/order.type'
import { formatCurrency } from '@/utils'
import { TableColumn } from '@/types/dataTable.type'
import { getLabel, OrderStatus } from '@/utils/recordStatus'
import Dropdown from '@/app/dashboard/_components/dropDown'
import { Button } from '@/app/_components/button'
import { handleDetailTableOrders } from '@/services/retriveSSRData/retriveTableOrdersData'

interface DetailTableOrdersPage {
  initialOrders: OrderProps[]
  currentTableId: string
}

export default function DetailTableOrdersPage({
  initialOrders,
  currentTableId
}: DetailTableOrdersPage) {
  const {
    isOrderModalOpen,
    selectedOrder,
    setOrderModalOpen,
    setSelectedOrder,
    handleDeleteOrder,
    handleCloseBill
  } = useContext(OrderContext)
  const router = useRouter()

  const handlePreviousPage = () => {
    router.push('/dashboard')
  }
  const [clientName, setClientName] = useState<string>('')
  const [orders, setOrders] = useState<OrderProps[]>(initialOrders)
  const [filteredOrders, setFilteredOrders] = useState<OrderProps[]>(orders)

  const uniqueOrderNames = Array.from(new Set(orders.map(order => order.name)))

  const optionsWithAll = [
    { label: 'Todos', value: '' },
    ...uniqueOrderNames.map(name => ({ label: name, value: name }))
  ]

  useEffect(() => {
    const newOrders =
      clientName === ''
        ? orders
        : orders.filter(order => order.name.includes(clientName))
    setFilteredOrders(newOrders)
  }, [clientName, orders])

  const handleViewOrder = (order: OrderProps) => {
    setSelectedOrder(order)
    setOrderModalOpen(true)
  }

  const closeModal = async () => {
    setOrderModalOpen(false)
    setOrders(await handleDetailTableOrders(currentTableId))
  }

  const columns: TableColumn<OrderProps>[] = [
    { name: 'Pedido N°', selector: row => row.number },
    {
      name: 'Status',
      cell: row => {
        const statusClass = {
          [OrderStatus.DRAFT]: styles.draft,
          [OrderStatus.IN_PROGRESS]: styles.inProgress,
          [OrderStatus.COMPLETED]: styles.completed,
          [OrderStatus.PAID]: styles.paid,
          [OrderStatus.CLOSED]: styles.closed
        }[row.status]

        return (
          <p className={`${styles.status} ${statusClass || ''}`}>
            {getLabel(row.status)}
          </p>
        )
      }
    },
    { name: 'Cliente', selector: row => row.name },
    { name: 'Total', selector: row => formatCurrency(row.total.toString()) },
    {
      name: 'Ações',
      cell: row => (
        <div className={'actions'}>
          <button onClick={() => handleViewOrder(row)}>
            <Eye />
          </button>
          <button onClick={() => handleDeleteOrder(row)}>
            <Trash2 />
          </button>
        </div>
      )
    }
  ]

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>
          <button
            className={styles.prevPageButton}
            onClick={handlePreviousPage}
          >
            <ArrowBigLeft size={40} />
          </button>
          <h1>Detalhes da Mesa</h1>
        </div>

        {orders[0] && (
          <>
            <Dropdown
              defaultValue={clientName}
              options={optionsWithAll}
              name={'clientName'}
              onChange={setClientName}
            />

            <Button
              type="button"
              name="Fechar mesa"
              style={{ padding: '10px' }}
              onClick={() => handleCloseBill(currentTableId)}
            />
          </>
        )}
      </header>
      <DataTable columns={columns} data={filteredOrders} />
      <OrderModal
        isOpen={isOrderModalOpen}
        order={selectedOrder!}
        onClose={closeModal}
      />
    </main>
  )
}
